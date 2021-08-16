/**
 * Generate HTML Plugins
 */

 const path = require('path');
 const fs = require('fs');
 const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
 
 const directories = [];
 let directoriesExcluded = null;
 
 function walkDir(dir, parent = '') {
   const files = fs.readdirSync(dir)
 
   // Search for files
   for (let x in files) {
     const next = path.join(dir,files[x]);
     // Check if its a directory
     if (fs.lstatSync(next).isDirectory() == true) {
       // Search excluded directories list
       for (let y in directoriesExcluded) {
         // Check if its not an excluded directory
         if (!next.includes(directoriesExcluded[y])) {
           walkDir(next, parent + '/' + files[x]);
         }
       }
     } else {
      if (path.parse(files[x]).ext.includes('njk')) {
        directories.push([path.parse(files[x]).name, (parent + '/').slice(1)])
      }
     }
   }
 
   return directories
 }
 
 const pages = {
   generatePages: function generatePages(pagesPath, excludePaths) {
     directoriesExcluded = excludePaths;
     return walkDir(pagesPath).map(name => new NunjucksWebpackPlugin({
       templates: [{
         from: `${pagesPath}/${name[1]}${name[0]}.njk`,
         to: `${name[1]}${name[0]}.html`
       }]
     }));
   }
 };
 
 module.exports = pages;