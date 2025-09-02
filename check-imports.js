import fs from "fs";
import path from "path";

const projectRoot = path.resolve("./src"); // غيرها لو مشروعك مش جوه src

// دالة لقراءة الملفات بشكل recursive
function getAllFiles(dir, extList = [".js", ".jsx"]) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, extList));
    } else {
      if (extList.includes(path.extname(file))) {
        results.push(filePath);
      }
    }
  });

  return results;
}

// يشيك import path مقابل أسماء الملفات الفعلية
function checkImports(file) {
  const content = fs.readFileSync(file, "utf-8");

  const regex = /import\s+.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const importPath = match[1];

    // نتجاهل المكتبات (اللي مش relative path)
    if (!importPath.startsWith(".")) continue;

    const absImportPath = path.resolve(path.dirname(file), importPath);

    let filePath = absImportPath;
    if (!path.extname(filePath)) {
      // جرّب امتدادات .js و .jsx
      if (fs.existsSync(filePath + ".js")) filePath += ".js";
      else if (fs.existsSync(filePath + ".jsx")) filePath += ".jsx";
      else if (fs.existsSync(filePath + "/index.js")) filePath += "/index.js";
      else if (fs.existsSync(filePath + "/index.jsx"))
        filePath += "/index.jsx";
    }

    if (fs.existsSync(filePath)) {
      // قارن الأسماء actual vs imported
      const partsImport = path.normalize(importPath).split(path.sep);
      const partsReal = path
        .relative(path.dirname(file), filePath)
        .split(path.sep);

      partsImport.forEach((part, i) => {
        if (partsReal[i] && part !== partsReal[i]) {
          console.log(
            `⚠️ Case mismatch in "${file}":\n   imported: ${importPath}\n   actual:   ${path.relative(
              path.dirname(file),
              filePath
            )}\n`
          );
        }
      });
    } else {
      console.log(
        `❌ File not found for import in "${file}": ${importPath}`
      );
    }
  }
}

// ---- Main ----
const allFiles = getAllFiles(projectRoot);
allFiles.forEach((file) => checkImports(file));

console.log("✅ Check complete!");
