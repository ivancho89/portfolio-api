const config = require("config")
const path   = require("path")
const fs     = require('fs')

const Validator      = rootRequire("lib/validator")
const i18n    = require('i18n')

const headersSchema  = rootRequire("lib/utils/validators/headers")

const getEntity = (moduleName, entity = '', file = '') =>{

  let path = [
    process.cwd(),
    'app',
    'modules',
    moduleName
  ]

  if(entity != '')
    path.push(entity)

  if(file != '')
    path.push(`${file}.js`)

  let fullPath = path.join('/')

  if (!fs.existsSync(fullPath))
      return {}

  return require(fullPath)

}


const filterFiles = (fileName, extension) => {
  extension = extension || 'js'
  return path.extname(fileName) === ('.' + extension)
}


const listFilesInFolder  = (folderPath, extension) => {

  const completePath = path.join(`${process.cwd()}`, folderPath)

  if (!fs.existsSync(completePath))
      return []

  return fs.readdirSync(completePath)
  .filter((file) => filterFiles(file, extension))
}


const requireController = (moduleName) => getEntity(moduleName, 'controllers', `${moduleName}.controller`)

const requireService = (moduleName, serviceName = '') =>{

  serviceName = serviceName === '' ? `${moduleName}.service` : serviceName
  return getEntity(moduleName, 'services', serviceName)
}

const requireModel = (moduleName, modelName = '') =>{

  modelName = modelName === '' ? `${moduleName}.model` : modelName
  return getEntity(moduleName, 'models', modelName)
}

const requireJoiSchema = (moduleName) =>{
  return getEntity(moduleName, 'schemas', 'index')
}

const requireBase = (baseName = '') =>{
  return getEntity('base', '', `base.${baseName}` )
}


const requireRoutes = (folderPath, totalModules = 1, app, express, globalApp, ) => {

  listFilesInFolder(folderPath)
  .forEach((file) => {

    var entity

    const routeModule = require(path.join(process.cwd(), folderPath, file))
    routeModule
    .routes
    .forEach((routhPath, index)=>{

      if(index === 0) {
        entity = routhPath[index]
        return
      }

      let [method, routePath, headerValidationType, fieldsValidator, moduleController] = routhPath
      let urlPath = ""

      if (routePath !== "") {
        urlPath = `/${entity}/${routePath}`
      } else {
        urlPath = `/${entity}`
      }

      let headersValidator

      if (!fieldsValidator && !moduleController) {
        moduleController = headerValidationType
        headersValidator = Validator(headersSchema.headers, {allowUnknown: true})
        fieldsValidator = (req, res, next)=>{
          next()
        }

      } else if(!moduleController) {

        moduleController = fieldsValidator

        if (typeof headerValidationType === "string") {
          headersValidator = Validator(headersSchema[headerValidationType+"Headers"], {allowUnknown: true})
          fieldsValidator = (req, res, next)=>{
            next()
          }
        } else {
          headersValidator = Validator(headersSchema.headers, {allowUnknown: true})
          fieldsValidator = headerValidationType
        }

      } else if (headerValidationType && moduleController) {
        headersValidator = Validator(headersSchema[headerValidationType+"Headers"], {allowUnknown: true})
      }

      const finalCall = (req, res, next) =>{ 
        moduleController(req, res)
      }
      
      app[method](
        urlPath,
        headersValidator,
        fieldsValidator,
        finalCall
      )
    })
  })
}



const listFoldersInFolder = () => {

  const completePath =  path.join(`${process.cwd()}/app/modules`)

  return fs.readdirSync(completePath)
  .filter((folder) => fs.statSync(path.join(completePath, folder)).isDirectory())
}



module.exports = {
  requireController,
  requireService, 
  requireModel,
  requireBase,
  listFoldersInFolder,
  requireRoutes,
  requireJoiSchema
}