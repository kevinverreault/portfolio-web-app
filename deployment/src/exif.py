import json
import os
from datetime import datetime
from PIL import Image
from PIL.ExifTags import TAGS
import asyncio
import codecs
import sys
import piexif

temp_suffix = '_temp'
to_delete_suffix = '_todelete'
format_placeholder = '-format-'
source_folder = f"../image-sources/{format_placeholder}/250w"


def overwrite_files_in_directory(images_path):
    entries = os.scandir(images_path)
    for entry in entries:
        if entry.is_file():
            image = os.path.join(images_path, entry.name)
            print(f"overwriting exif for {image}")

            with Image.open(image) as img:
                exif_bytes = piexif.dump({"0th": {}, "Exif": {}, "GPS": {}})

                temp_name = image + temp_suffix
                to_delete = image + to_delete_suffix

                img.save(temp_name, "jpeg", exif=exif_bytes)

            os.rename(image, to_delete)
            os.rename(temp_name, image)
            os.remove(to_delete)


def correct_encoding(text):
    try:
        # First, encode as Latin-1 (which will preserve the bytes)
        latin1_bytes = text.encode('latin-1')
        # Then decode as UTF-8, which should correct the encoding
        return latin1_bytes.decode('utf-8')
    except UnicodeEncodeError:
        # If it's already correctly encoded UTF-8, this will fail
        # In that case, just return the original text
        return text


def get_image_metadata(image_directory, image_name):
    image_path = os.path.join(os.path.abspath(image_directory), f"{image_name}.jpg")
    try:
        with Image.open(image_path) as img:
            exif_data = img._getexif()
            if exif_data:
                exif = {TAGS[k]: v for k, v in exif_data.items() if k in TAGS}

                image_description = exif.get('ImageDescription')
                date_taken = exif.get('DateTimeOriginal')

                if image_description:
                    image_description = correct_encoding(image_description)

                    if date_taken:
                        date_obj = datetime.strptime(date_taken, "%Y:%m:%d %H:%M:%S")
                        image_description += f" - {date_obj.year}"

                    # print(f"Corrected image description: {image_description}")
                    return {"description": image_description}
    except Exception as error:
        print(f"failed to get exif for {image_path}, error: {str(error)}")

    return {"description": ""}


def clear_metadata():
    overwrite_files_in_directory(os.path.abspath(source_folder.replace(format_placeholder, 'thumbnail')))
    overwrite_files_in_directory(os.path.abspath(source_folder.replace(format_placeholder, 'fullsize')))
    print('exif-overwrite completed')


async def update_metadata():
    try:
        public_path = os.path.abspath("../frontend")
        images_path = "../image-sources/fullsize/250w"
        json_file_path = os.path.join(public_path, "src", "metadata.json")

        with codecs.open(json_file_path, "r", encoding="utf-8-sig") as file:
            json_data = json.load(file)

        for album in json_data["albums"]:
            album["photos"].sort(key=lambda x: x["order"])
            for photo in album["photos"]:
                photo["metadata"] = get_image_metadata(images_path, photo["id"])

        with codecs.open(json_file_path, "w", encoding="utf-8") as file:
            json.dump(json_data, file, ensure_ascii=False, indent=2)

        print("JSON data updated successfully.")
    except Exception as err:
        print("Error processing the JSON file:", str(err))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python exif.py <generate|clean>")
        sys.exit(1)

    command = sys.argv[1]
    if command == "generate":
        asyncio.run(update_metadata())
    elif command == "clean":
        clear_metadata()
    else:
        print("Invalid command.")
        sys.exit(1)
