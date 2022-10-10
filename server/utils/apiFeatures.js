class apiFeatures {
  constructor(queryFunc, queryStr) {
    this.queryFunc = queryFunc;
    this.queryStr = queryStr;
  }

  //? search by query string
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.queryFunc.find({ ...keyword });

    return this;
  }

  //?filtering by categories and price
  filter() {
    let queryOptions = { ...this.queryStr };

    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach((el) => {
      delete queryOptions[el];
    });

    const stringOfQuery = JSON.stringify(queryOptions);
    queryOptions = stringOfQuery.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryOptions));
    return this;
  }

  //? pagination
  pagination(contentPerPage) {
    const currPage = Number(this.queryStr.page) || 1;
    const skip = contentPerPage * (currPage - 1);

    this.query = this.query.limit(contentPerPage).skip(skip);
    return this;
  }
}

module.exports = apiFeatures;
