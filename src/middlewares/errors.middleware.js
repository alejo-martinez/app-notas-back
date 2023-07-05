import typeError from "../errors/typeError.js";

export default (err, req, res, next)=>{
    switch (err.code) {
        case typeError.INVALID_TYPES_ERROR:
            res.status(401).send({status:'error',  error: `${err.message}: ${err.cause}`})
            break;
        
        case typeError.MISSING_REQUIRED_FIELDS_ERROR:
            res.status(400).send({status:'error', error: `${err.message}: ${err.cause}`})
            break;
        case typeError.FIELD_VALIDATION_FAILED_ERROR:
            res.status(401).send({status:'error', error: `${err.message}: ${err.cause}`})
            break;
        case typeError.ROUTING_ERROR:
            res.status(404).send({status:'error', error: `${err.message}: ${err.cause}`})
            break;
        case typeError.DATABASE_ERROR:
            res.status(503).send({status:'error', error: `${err.message}: ${err.cause}`})
            break;
        case typeError.UNKNOWN_ERROR:

            break;
        default:
            res.send({status:'error', error:`Error desconocido: ${err}`})
            break;
    }
}