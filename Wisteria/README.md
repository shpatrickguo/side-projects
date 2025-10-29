# Wisteria

A toolkit to help guilds manage their members' guild battle damage in Cookie Run Kingdom. Instead of manually typing damage numbers from screenshots into Excel, this program processes images submitted by guild members showing their damage performance on each guild battle boss, extracts the damage numbers using OCR (Optical Character Recognition), and exports them into `.csv` files for record keeping.

## Features

- **Automated OCR Processing**: Extracts damage numbers from guild battle screenshots
- **Batch Processing**: Processes multiple screenshots from multiple users at once
- **Boss-Specific Reports**: Generates separate CSV reports for each boss
- **Duplicate Handling**: Automatically keeps only the maximum damage per user per boss
- **Folder Management**: Utility to create folders for all guild members

## Prerequisites

- Python 3.x
- Tesseract OCR installed on your system
  - **macOS**: `brew install tesseract`
  - **Ubuntu/Debian**: `sudo apt-get install tesseract-ocr`
  - **Windows**: Download from [GitHub releases](https://github.com/UB-Mannheim/tesseract/wiki)

## Installation

1. Install required Python packages:
```bash
pip install -r requirements.txt
```

2. Ensure Tesseract OCR is installed and accessible from your PATH

## Project Structure

```
Wisteria/
├── README.md                    # This file
├── requirements.txt             # Python dependencies
├── dmgCheck.py                  # Main OCR processing script
├── createFolder.py              # Utility to create user folders
├── extractDmgCheckChat.py       # Extract data from Discord chat exports
└── bossDmg/                     # Directory containing user screenshots (create this)
    └── username1/
        ├── screenshot1.png
        └── screenshot2.png
    └── username2/
        ├── screenshot1.png
        └── screenshot2.png
```

## Usage

### 1. Setting Up User Folders

If you need to create folders for all guild members, update the usernames list in `createFolder.py` and run:

```bash
python createFolder.py
```

This will create a folder for each username in the list.

### 2. Processing Damage Screenshots

**Step 1**: Organize your screenshots
- Create a `bossDmg` directory if it doesn't exist
- Place each user's screenshots in their respective folder under `bossDmg/`

**Step 2**: Update the season variable
- Open `dmgCheck.py` and update the `SEASON` variable (line 15) to match the current season:
```python
SEASON = "S3-4"  # Update this to current season
```

**Step 3**: Run the processing script
```bash
python dmgCheck.py
```

**Step 4**: Check the output
- CSV files will be generated in the `report/` directory
- One file per boss: `dmgCheckLA.csv`, `dmgCheckRVD.csv`, etc.

### 3. Discord Chat Export Processing (Optional)

If you have exported Discord chat logs containing damage screenshots:

```bash
python extractDmgCheckChat.py
```

This requires a `dmgCheckChat.html` file exported from Discord.

## Supported Bosses

The script currently recognizes the following bosses:
- Living Abyss (LA)
- Red Velvet Dragon (RVD)
- Avatar of Destiny (AoD) - Currently commented out in code

## Output Format

CSV files contain the following columns:
- **IGN**: In-Game Name (username)
- **Damage**: Maximum damage dealt to the boss
- **Season**: Season identifier

## Configuration

### Main Configuration (`dmgCheck.py`)

- `SEASON`: Current season identifier (e.g., "S3-4")
- `main_folder`: Directory containing user folders (default: "bossDmg")
- `IMAGE_FORMATS`: Supported image formats (png, jpg, jpeg)

### OCR Settings

You can adjust the OCR accuracy by modifying the `kernel_size` parameter in the `ocr_image()` function (default: 1).

## Troubleshooting

### OCR Not Working
- Ensure Tesseract is properly installed and in your PATH
- Try adjusting the `kernel_size` parameter for better image preprocessing
- Verify your screenshots are clear and readable

### Missing Data
- Check that screenshot filenames don't contain special characters
- Ensure screenshots show the "Total Damage" text clearly
- Verify boss names match the expected format

### Dependencies Issues
- Make sure all packages in `requirements.txt` are installed
- Use a virtual environment to avoid conflicts

## Future Improvements

- [ ] Connect with Google Sheets for dynamic username management
- [ ] Integrate `extractDmgCheckChat.py` to automate photo organization
- [ ] Add support for more bosses
- [ ] Improve error handling and logging
- [ ] Add configuration file support

## Notes

- The script automatically filters for the maximum damage per user per boss
- Duplicate entries are removed from the final output
- The `createFolder.py` script contains outdated usernames and should be updated before use