import os
import sys
import shutil
import re

try:
    ROOT_PATH = os.environ["PORTFOLIO_IMAGES_SOURCE_PATH"]
    ROOT_DESTINATION_PATH = os.environ["PORTFOLIO_IMAGES_DESTINATION_PATH"]
except KeyError as e:
    print(f"Required environment variable {e.args[0]} is not set. Aborting...")
    raise SystemExit(1)

DESTINATION_SUBDIRECTORIES = {
    "Green": "fullsize",
    "Orange": "thumbnail",
}


def ensure_directory_exists(directory_path):
    if os.path.exists(directory_path):
        shutil.rmtree(directory_path)
    os.makedirs(directory_path)


def sanitize_filename(filename):
    sanitized = re.sub(r"__+", "_", filename)
    base, ext = os.path.splitext(sanitized)
    base = re.sub(r"_[0-9]_[0-9]+$", "", base)
    base = re.sub(r"_[0-9]+$", "", base)
    base = re.sub("_DSF", "_DSCF", base)
    return base + ext


def copy_files(source_sub_path, destination_path):
    ensure_directory_exists(destination_path)
    for filename in os.listdir(source_sub_path):
        full_file_path = os.path.join(source_sub_path, filename)
        if os.path.isfile(full_file_path):
            sanitized_filename = sanitize_filename(filename)
            shutil.copy(
                full_file_path, os.path.join(destination_path, sanitized_filename)
            )


def process_directory(directory_path, keyword=None, relative_path=""):
    for entry in os.listdir(directory_path):
        full_path = os.path.join(directory_path, entry)
        if os.path.isdir(full_path):
            if entry in DESTINATION_SUBDIRECTORIES or keyword:
                current_keyword = keyword if keyword else entry
                new_relative_path = (
                    os.path.join(relative_path, entry) if keyword else ""
                )
                destination_subdir = DESTINATION_SUBDIRECTORIES[current_keyword]
                destination_path = os.path.join(
                    ROOT_DESTINATION_PATH, destination_subdir, new_relative_path
                )
                if keyword:
                    copy_files(full_path, destination_path)
                else:
                    process_directory(
                        full_path,
                        keyword=current_keyword,
                        relative_path=new_relative_path,
                    )
            else:
                process_directory(
                    full_path, relative_path=os.path.join(relative_path, entry)
                )


def copy_images():
    src = "../image-sources"
    dst = "./public/images"

    try:
        if os.path.exists(dst):
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
        print("Images copied successfully.")
    except Exception as e:
        print(f"Error copying images: {e}")


def clean_images():
    dst = "./public/images"
    try:
        if os.path.exists(dst):
            shutil.rmtree(dst)
        print("Images cleaned successfully.")
    except Exception as e:
        print(f"Error cleaning images: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python images.py <stage|unstage|import>")
        sys.exit(1)

    command = sys.argv[1]
    if command == "stage":
        copy_images()
    elif command == "unstage":
        clean_images()
    elif command == "import":
        process_directory(ROOT_PATH)
    else:
        print("Invalid command.")
        sys.exit(1)
