/**
 * Generating HAPI-Style based
 * module with version system
 * and consider that postgres
 * is using as backend
 */

'use strict';

var fs           = require('fs'),
    args         = process.argv,
    moduleName   = '',
    versionName  = 'v1',
    currentPath  = __dirname,
    subPath      = '/../server/api',
    fsList       = [],
    manifestFile = '/../manifest.js';

const _controllerFileContent = currentPath + '/templates/controller-template.js';
const _modelFileContent      = currentPath + '/templates/model-template.js';
const _validatorFileContent  = currentPath + '/templates/validator-template.js';

String.prototype.toUCFirstCase = function() {
  var _f = this.substr(0, 1),
      _s = this.substr(1, (this.length - 1));

  return _f.toUpperCase() + _s.toLowerCase();
}


// Validate user passed module name or not
if(args.length < 3) {
  return console.error('Please enter the Module Name **Required');
}


// Start Processing to generate module
moduleName = args[2];

// Add version as passed by user
if(args.length == 4) {
  versionName = args[3];
}

// Verify the existing of directory and file
var checkExists = (_subPath) => {

  try{
    return fs.statSync(_subPath);
  } catch (e) {

    if(e.message.indexOf('ENOENT: no such file or directory') >= 0) {
      return false;
    }

    throw new Error(e.message);
  }
}

var updateManifestFile = (filePath, _info) => {

  fs.readFile(currentPath+manifestFile, (err, _data) => {
    var pluginPath   = (subPath.replace('../', '')+_info.path+'/'+_info.name).replace('.js', ''),
        repalceText  = 'registrations: [',
        replaceByTxt = repalceText+'\n    {plugin: \'.'+pluginPath+'\'},',
        fileData     = _data.toString('utf8');
        fileData     = fileData.replace(repalceText, replaceByTxt);

    fs.writeFile(currentPath+manifestFile, fileData, (_fwerr, _d) => {
      console.log('Module is enabled now...', (_fwerr ? _fwerr.message : ''));
    });
  });
}



var CreateAndWriteFile = function(filePath, _info) {

  var isControllerFile = (filePath.indexOf('.controller.js') >= 0);
  var isValidatorFile  = (filePath.indexOf('index.js') >= 0);

  fs.open(filePath, 'a+', function(e, f) {

    if(_info.content) {

      fs.readFile(_info.content, function(_e, _d) {

        var moduleVar = ((isControllerFile || isValidatorFile) ? fileNames.toUCFirstCase() : fileNames),
            _content  = _d.toString('utf8');
            _content  = _content.replace(/MODULEVAR/g, moduleVar + 'Model');

        if(_info.modelPath) {
          _content = _content.replace('MODULEPATH', _info.modelPath);
        }

        _content = _content.replace(/MODULENAME/g, fileNames);

        fs.write(f, _content);
        fs.close(f);
      });
    }
    else {
      fs.write(f, "'use strict';");
      fs.close(f);
    }

    if(isControllerFile) {
      updateManifestFile(filePath, _info);
    }
  });
}

if(checkExists(currentPath+manifestFile) && checkExists(currentPath+subPath)) {
  var fileNames   = moduleName.toLowerCase();
  var moduleInfos = [
    {type: 'd', name: fileNames, path: ''},
    {type: 'd', name: versionName, path: '/'+fileNames},
    {type: 'd', name: 'controller', path: '/'+fileNames+'/'+versionName},
    {type: 'd', name: 'model', path: '/'+fileNames+'/'+versionName},
    {type: 'd', name: 'validator', path: '/'+fileNames+'/'+versionName},
    {type: 'f', name: fileNames+'.controller.js', path: '/'+fileNames+'/'+versionName+'/controller', modelPath: '../model/'+fileNames+'.model', content: _controllerFileContent},
    {type: 'f', name: fileNames+'.model.js', path: '/'+fileNames+'/'+versionName+'/model', content: _modelFileContent},
    {type: 'f', name: 'index.js', path: '/'+fileNames+'/'+versionName+'/validator', content: _validatorFileContent},
  ];

  console.log('Generating Module ....');
  for(var idx in moduleInfos) {
    var _info = moduleInfos[idx],
        _chkP = currentPath+subPath+_info.path+'/'+_info.name;

    console.log(_chkP);
    if(!checkExists(_chkP)) {
      if(_info.type === 'd') {
        fs.mkdirSync(_chkP);
      }

      if(_info.type === 'f') {
        fsList.push(new CreateAndWriteFile(_chkP, _info));
      }
    }
  }
  console.log('Module ' + moduleName + ' Generated Successfully.');
}
else {
  return console.error('Sorry !, Please move to your project root and then run command again');
}
