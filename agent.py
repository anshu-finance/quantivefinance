import os
import shutil
import json
import subprocess

# --- CONFIGURATION ---
DATABASE_FILE = "database.js"
GITHUB_REPO_PATH = os.getcwd() # Assumes script is inside the folder

def get_input(prompt):
    return input(f"\n🔹 {prompt}: ").strip()

def update_database(new_entry):
    # 1. Read existing JS file
    with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # 2. Extract the array part (Remove "const projectData = " and ";")
    json_str = content.replace("const projectData = ", "").strip().rstrip(";")
    
    # 3. Use specialized parsing because JS objects aren't strict JSON (keys have no quotes)
    # Ideally, we strictly use JSON, but to keep your file simple, we append manually to the string.
    
    # Construct the new JS object string
    metrics_str = ""
    for m in new_entry['metrics']:
        hl = ", highlight: true" if m.get('highlight') else ""
        metrics_str += f"            {{ label: '{m['label']}', value: '{m['value']}'{hl} }},\n"

    new_obj_str = f"""
    {{
        category: "{new_entry['category']}",
        title: "{new_entry['title']}",
        status: "{new_entry['status']}",
        desc: "{new_entry['desc']}",
        pdf: "{new_entry['pdf']}",
        metrics: [
{metrics_str}        ]
    }},"""

    # 4. Insert before the closing bracket of the array
    last_bracket_index = content.rfind("]")
    new_content = content[:last_bracket_index] + new_obj_str + "\n" + content[last_bracket_index:]

    with open(DATABASE_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Database updated successfully.")

def main():
    print("🤖 QUANTIVE AI AGENT ACTIVATED")
    print("==============================")

    # 1. Get PDF
    pdf_path = get_input("Drag and drop the PDF file here").replace("'", "").replace('"', "")
    if not os.path.exists(pdf_path):
        print("❌ Error: File not found.")
        return

    pdf_filename = os.path.basename(pdf_path)
    
    # 2. Get Details
    category = get_input("Category (equity / mf / ipo)").lower()
    title = get_input("Company / Fund Name")
    status = get_input("Status Tag (e.g., 'DCF Analysis' or 'High Risk')")
    desc = get_input("Short Description")

    # 3. Get Metrics
    metrics = []
    print("\n📊 Enter 4 Key Metrics:")
    for i in range(1, 5):
        label = get_input(f"Metric {i} Label (e.g., P/E Ratio)")
        value = get_input(f"Metric {i} Value (e.g., 20x)")
        highlight = get_input("Highlight this red? (y/n)").lower() == 'y'
        metrics.append({"label": label, "value": value, "highlight": highlight})

    new_entry = {
        "category": category,
        "title": title,
        "status": status,
        "desc": desc,
        "pdf": pdf_filename,
        "metrics": metrics
    }

    # 4. Move PDF to folder
    destination = os.path.join(GITHUB_REPO_PATH, pdf_filename)
    shutil.copy(pdf_path, destination)
    print(f"✅ PDF moved to {destination}")

    # 5. Update Database
    update_database(new_entry)

    # 6. Git Push
    confirm = get_input("Push to GitHub now? (y/n)")
    if confirm.lower() == 'y':
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", f"Added report: {title}"], check=True)
        subprocess.run(["git", "push"], check=True)
        print("🚀 Website Updated & Live!")
    else:
        print("⚠️ Changes saved locally but not pushed.")

if __name__ == "__main__":
    main()
