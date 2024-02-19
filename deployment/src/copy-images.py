import os
import shutil
import re

# Constants for source and root destination paths
ROOT_PATH = r"C:\Users\Kevin\Pictures\JPEG\Autre\siteweb"  # Update this path with the root source directory
ROOT_DESTINATION_PATH = r"D:\code\portfolio-web-app\image-sources"  # Update this path for the root destination

# Keywords and their corresponding subdirectories at the destination
DESTINATION_SUBDIRECTORIES = {
    "Green": "fullsize",  # Subdirectory for "fullsize" images
    "Orange": "thumbnail",  # Subdirectory for "thumbnail" images
}

# Ensure destination directories exist, create them if they don't
def ensure_directory_exists(directory_path):
    if os.path.exists(directory_path):
        shutil.rmtree(directory_path)
    os.makedirs(directory_path)

def sanitize_filename(filename):
    # Replace double underscores with a single one
    sanitized = re.sub(r"__+", "_", filename)
    # Remove trailing underscore and number
    sanitized = re.sub(r"_[0-9]+$", "", sanitized)
    return sanitized

def copy_files_based_on_keyword(keyword, source_sub_path, relative_path=""):
    destination_subdir = DESTINATION_SUBDIRECTORIES[keyword]
    destination_path = os.path.join(ROOT_DESTINATION_PATH, destination_subdir, relative_path)
    print(destination_path)
    ensure_directory_exists(destination_path)
    for filename in os.listdir(source_sub_path):
        full_file_path = os.path.join(source_sub_path, filename)
        if os.path.isfile(full_file_path):
            sanitized_filename = sanitize_filename(filename)
            shutil.copy(full_file_path, os.path.join(destination_path, sanitized_filename))

def process_directory(directory_path, relative_path=""):
    for entry in os.listdir(directory_path):
        full_path = os.path.join(directory_path, entry)
        print(full_path)
        if os.path.isdir(full_path):
            # Check if the directory name matches any of our keywords
            if entry in DESTINATION_SUBDIRECTORIES:
                copy_files_based_on_keyword(entry, full_path, relative_path)
                print(full_path)
            else:
                # Recurse into subdirectories that are not keyword directories
                new_relative_path = os.path.join(relative_path, entry)
                process_directory(full_path, new_relative_path)

# Start processing from the ROOT_PATH
process_directory(ROOT_PATH)

print("Files have been successfully copied based on their format.")
