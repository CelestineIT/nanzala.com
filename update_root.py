from pathlib import Path
path = Path('style.css')
text = path.read_text()
root = ":root {\r\n  color-scheme: dark;\r\n  --bg: #05030a;\r\n  --card: rgba(17, 16, 27, 0.85);\r\n  --accent: #ffb87a;\r\n  --accent-2: #f5a7c6;\r\n  --text: #fdfaf8;\r\n  --text-soft: #d0d0df;\r\n  --border: rgba(255, 255, 255, 0.15);\r\n  --glass: rgba(255, 255, 255, 0.06);\r\n}\r\n\r\n"
repl = ":root {\r\n  color-scheme: dark;\r\n  --bg: #05030a;\r\n  --card: rgba(17, 16, 27, 0.85);\r\n  --accent: #ffb87a;\r\n  --accent-2: #f5a7c6;\r\n  --text: #fdfaf8;\r\n  --text-soft: #d0d0df;\r\n  --border: rgba(255, 255, 255, 0.15);\r\n  --glass: rgba(255, 255, 255, 0.06);\r\n  --mood-glow: rgba(255, 255, 255, 0.04);\r\n}\r\n\r\n"
if root not in text:
    raise SystemExit('root block not found')
path.write_text(text.replace(root, repl, 1))
