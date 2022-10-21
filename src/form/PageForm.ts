export class PageForm {
    currentPage: number = 1
    pageSize: number = 10
    constructor() {

    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize
    }
}