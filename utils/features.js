class Features {
    constructor(query,params){
        this.query = query;
        this.params = params;
    }

    sort = () => {
        const sort = this.params.sort
        if(sort){
            let buildSort  = ''
            if(typeof sort === 'string'){
                buildSort = sort.split(',').join(' ')
            }
            else if(Array.isArray(sort)){
                buildSort = sort.join(' ');
            }
            this.query = this.query.sort(buildSort)
            
        }

        return this;
    }

    filter = () => {
        
        const queryObject = {...this.params};
        const excludeFields = ['sort','fields','limit','page'];
        excludeFields.forEach(field => delete queryObject[field]);
        
        const objectStr = JSON.stringify(queryObject);
        let queryStr = objectStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    fields = () => {
        let desiredFields = '-__v';
        if(this.params.fields){
            desiredFields = this.params.fields.split(',').join(' ');
        }
        this.query = this.query.select(desiredFields);
        return this;
    }

    paginate = () => {
        if(this.params.limit){
            const page = this.params.page * 1 || 1;
            const limit = this.params.limit * 1 || 50;  
            let skip = 0;
            if(this.params.page){
                skip = (page -1) * limit;
            }
            this.query = this.query.skip(skip).limit(limit);
        }
        return this;
    }
    
}

module.exports = Features;