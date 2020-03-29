/* 存放侧边栏数据 */
export default [
    {
        key:'1',
        title:'下厨房后台管理系统',
        icon:'home',
        path:'/admin/main'
    },
    {
        key:'2',
        title:'管理员管理',
        icon:'administrator',
        children:[
            {
                key:'2-1',
                title:'管理员列表',
                icon:'default',
                path:'/admin/main/administrator',
            },
            {
                key:'2-2',
                title:'新增管理员',
                icon:'default',
                path:'/admin/main/administrator/add'
            },
            {
                key:'2-3',
                title:'管理员权限更改',
                icon:'default',
                path:'/admin/main/administrator/change'
            },
            {
                key:'2-4',
                title:'删除管理员',
                icon:'default',
                path:'/admin/main/administrator/delete'
            }
        ]
    },
    {
        key:'3',
        title:'数据上传模块',
        icon:'data',
        children:[
            {
                key:'3-1',
                title:'上传菜谱图片',
                icon:'default',
                path:'/admin/main/statistics/img'
            }
        ]
    },
    {
        key:'4',
        title:'菜谱类别管理模块',
        icon:'cookbook',
        children:[
            {
                key:'4-1',
                title:'添加菜谱分类',
                icon:'default',
                path:'/admin/main/cookbook/add'
            },
            {
                key:'4-2',
                title:'删除菜谱分类',
                icon:'default',
                path:'/admin/main/cookbook/delete'
            },
        ]
    },
    {
        key:'5',
        title:'菜谱子类管理模块',
        icon:'menu',
        path:'/admin/main/menuType'
    },
    {
        key:'6',
        title:'用户上传审核模块',
        icon:'audit',
        children:[
            {
                key:'6-1',
                title:'审核通过',
                icon:'default',
                path:'/admin/main/audit/pass'
            },
            {
                key:'6-2',
                title:'审核驳回',
                icon:'default',
                path:'/admin/main/audit/oppose'
            }
        ]
    },
    {
        key:'7',
        title:'广告管理模块',
        icon:'advertising',
        children:[
            {
                key:'7-1',
                title:'新增广告',
                icon:'default',
                path:'/admin/main/advertising/add'
            },
            {
                key:'7-2',
                title:'更新广告',
                icon:'default',
                path:'/admin/main/advertising/updata'
            },
            {
                key:'7-3',
                title:'删除广告',
                icon:'default',
                path:'/admin/main/advertising/delete'
            }
        ]
    },
    {
        key:'8',
        title:'数据统计模块',
        icon:'data',
        children:[
            {
                key:'8-1',
                title:'新增用户统计',
                icon:'default',
                path:'/admin/main/statistics/add'
            },
            {
                key:'8-2',
                title:'活跃用户统计',
                icon:'default',
                path:'/admin/main/statistics/active'
            },
            {
                key:'8-3',
                title:'菜系占比统计',
                icon:'default',
                path:'/admin/main/statistics/cuisine'
            }
        ]
    },
    {
        key:'9',
        title:'用户操作日志模块',
        icon:'user',
        children:[
            {
                key:'9-1',
                title:'操作日志',
                icon:'default',
                path:'/admin/main/user/journal'
            }
        ]
    },
    {
        key:'10',
        title:'用户代办事项模块',
        icon:'user',
        children:[
            {
                key:'10-1',
                title:'代办事项',
                icon:'default',
                path:'/admin/main/user/backlog'
            }
        ]
    },
    
]