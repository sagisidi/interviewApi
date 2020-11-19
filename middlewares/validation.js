validate = (...fields) =>(req,res,next)=>{
	const validationObj = new Validation(fields,req);
	validationObj.check();

	if(validationObj._errors.length > 0)
		 return res.status(422).json(validationObj._errors);
	next();
}

class Validation {
	constructor(fields,req){
		this.fields = fields;
		this.req = req;
		this._errors = [];
	}

	check(){

		this.existFields();
		this.isEmpty();
		this.validateEmailPattern();
	}



	existFields () {
		const fields = this.fields;
		const body = this.req.body;
		for (const field of fields)
			if (! (field in body) ){
				const field = this.capitalize(field);
				this._errors.push(`${field} is required`);
			}
		

	}

	isEmpty(){
		const fields = this.fields;
		const body = this.req.body;
		for (const field of fields)
			if (!body[field] || body[field] ==='' ){
				const capField = this.capitalize(field);
				this._errors.push(`${capField} must include at least one character`);
			}
	}

	capitalize(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	validateEmailPattern() {
		const fields = this.fields;
		const body = this.req.body
		for (const field of fields){
			if (field==='email' && !this.validateEmail(body[field]))
				this._errors.push('Email is invalid');	
		}
	}

	validateEmail(mail){
		 	return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))

	}



}




module.exports = validate;