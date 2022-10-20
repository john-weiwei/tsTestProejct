export class PageInfo {
    currentPage: number = 1
    pageSize: number = 10
    totalSize!: number
    constructor() {

    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize
    }
}