import path from 'path'
import fs from "fs"


export const Node = {
    isFile:function(filename){
        return fs.lstatSync(filename).isFile()
    },
    getFullPath:function(folderPath){
        return fs.readdirSync(folderPath).map(fn  => path.join(folderPath, fn))
    },
    getFiles: function(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                /* Recurse into a subdirectory */
                results = results.concat(Node.getFiles(file));
            } else { 
                /* Is a file */
                results.push(file);
            }
        });
        const markdownFiles = results.filter(f => f.endsWith(".md"))
        return markdownFiles
    },
    readFileSync:function(fullPath){
        return fs.readFileSync(fullPath, "utf8")
    },

}