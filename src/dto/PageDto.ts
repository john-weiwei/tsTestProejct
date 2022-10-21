export class PageDto<T> {
    currentPage!: number
    pageSize!: number
    totalPage!: number
    totalSize!: number
    data!: T
    constructor() {

    }

    setCurrentPage(currentPage: number) {
        this.currentPage = currentPage
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize
    }

    setTotalSize(totalSize: number) {
        this.totalSize = totalSize
        const countPage: any = this.totalSize / this.pageSize
        this.totalPage = (this.totalSize % this.pageSize) == 0 ? countPage : parseInt(countPage) + 1
    }
    
    setData(data: T): void {
        this.data = data
    }

    getData(): T {
        return this.data;
    }
}