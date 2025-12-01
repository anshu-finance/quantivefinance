import os
import shutil

# --- CONFIGURATION ---
# Where should the files go?
BASE_REPORT_DIR = "reports"

# The Rules: { "Folder Name": ["keyword1", "keyword2"] }
# The script looks for these keywords in filenames to decide where to move them.
FOLDER_MAP = {
    "equity-reports":   ["dabur", "caplin", "apl", "apollo", "tata", "motors"],
    "mf-reports":       ["sbi", "nippon", "fund", "mutual"],
    "ipo-reports":      ["shreeji", "ipo"],
    "one-page-profile": ["jubilant", "profile", "one-page"]
}

# What file types should we move? (Add more if needed)
EXTENSIONS = (".pdf", ".docx", ".doc", ".html")

def organize_files():
    # 1. Create the folder structure if it doesn't exist
    if not os.path.exists(BASE_REPORT_DIR):
        os.mkdir(BASE_REPORT_DIR)
        print(f"Created base directory: {BASE_REPORT_DIR}")

    for folder in FOLDER_MAP:
        path = os.path.join(BASE_REPORT_DIR, folder)
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"📁 Created folder: {path}")

    # 2. Scan and Move Files
    current_dir = os.getcwd()
    moved_count = 0

    print("\n--- Scanning Files ---")
    
    for filename in os.listdir(current_dir):
        # Skip this script itself and the .git folder
        if filename == "organize.py" or filename.startswith("."):
            continue

        # Only look at specific file extensions
        if not filename.lower().endswith(EXTENSIONS):
            continue

        # Check which folder it belongs to
        moved = False
        for folder, keywords in FOLDER_MAP.items():
            # Check if any keyword matches the filename (case-insensitive)
            if any(keyword.lower() in filename.lower() for keyword in keywords):
                src = os.path.join(current_dir, filename)
                dst = os.path.join(BASE_REPORT_DIR, folder, filename)
                
                print(f"✅ Moving '{filename}' --> '{folder}/'")
                shutil.move(src, dst)
                moved = True
                moved_count += 1
                break # Stop checking other folders once a match is found
        
        if not moved:
            print(f"👀 Skipped '{filename}' (No matching keyword found)")

    print(f"\n✨ All done! Moved {moved_count} files.")

if __name__ == "__main__":
    organize_files()
