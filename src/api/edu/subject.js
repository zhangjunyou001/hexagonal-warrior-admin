import request from '@/utils/request'

export default {
    //讲师列表（分页条件Search）
    getSubjectList(){
        return request({
            url: `/eduservice/subject/getAllSubject`,
            method: 'get',
        })
    }

    
}
