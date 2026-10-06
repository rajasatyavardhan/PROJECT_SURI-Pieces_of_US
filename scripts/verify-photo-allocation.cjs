const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'src/config/suri.config.ts');
const compiled = ts.transpileModule(fs.readFileSync(configPath, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2022, esModuleInterop:true}}).outputText;
const configModule = {exports:{}};
const configRequire = require('node:module').createRequire(configPath);
new Function('require','module','exports',compiled)(configRequire,configModule,configModule.exports);
const config = configModule.exports.suriConfig;
const collectionPath = path.join(root,'src/config/photo-collections.ts');
const collectionCode = ts.transpileModule(fs.readFileSync(collectionPath,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const collections = {exports:{}};
new Function('module','exports',collectionCode)(collections,collections.exports);
const {storyCollections,galleryCollections,backgroundPhotos} = collections.exports;
const mosaic = JSON.parse(fs.readFileSync(path.join(root,'src/config/mosaic.generated.json'),'utf8'));
const sources = [config.media.hero.src,config.media.photo.src,config.mbbs.imageSrc,...storyCollections.flat().map(x=>x.src),...galleryCollections.flatMap(x=>x.photos.map(p=>p.src)),...backgroundPhotos,...mosaic.scenes.flatMap(x=>[x.target,...x.tiles.map(t=>t.src)])];
if (sources.includes('/media/memories/extra-02.webp')) throw Error('The excluded professor photo is still rendered');
if(new Set(sources).size!==sources.length) throw Error('A rendered source URL appears in more than one section');
const hashes = new Map();
for(const src of sources){
 const file=path.join(root,'public',src);
 const digest=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
 if(hashes.has(digest)) throw Error(`Duplicate asset bytes: ${src} and ${hashes.get(digest)}`);
 hashes.set(digest,src);
}
for(const scene of mosaic.scenes){
 if(new Set(scene.tiles.map(x=>x.cell)).size!==scene.tiles.length) throw Error('Two tiles occupy one cell');
 if(scene.tiles.some(x=>x.cell<0||x.cell>=scene.rows*scene.columns)) throw Error('Invalid mosaic cell');
}
if(mosaic.scenes.length!==2 || mosaic.uniqueTileCount!==mosaic.scenes.reduce((n,x)=>n+x.tiles.length,0)) throw Error('Mosaic counts do not agree');
console.log(JSON.stringify({status:'PHOTO_ALLOCATION_PASS',rendered_sources:sources.length,gallery_collections:galleryCollections.length,gallery_images:galleryCollections.reduce((n,x)=>n+x.photos.length,0),story_images:storyCollections.flat().length,background_images:backgroundPhotos.length,mosaic_tiles:mosaic.uniqueTileCount,per_mosaic:mosaic.scenes.map(x=>x.tiles.length),duplicate_urls:0,duplicate_asset_bytes:0,missing_assets:0},null,2));
