/* 存放侧边栏数据 */
export default [
    {
        key:'1',
        title:'下厨房后台管理系统',
        icon:'home',
        path:'/admin/main/home'
    },
    {
        key:'2',
        title:'管理员管理',
        icon:'administrator',
        path:'/admin/main/administrator',
        /* children:[
            {
                key:'2-1',
                title:'管理员列表',
                icon:'default',
                path:'/admin/main/administrator',
            }
        ] */
    },
    /* {
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
    }, */
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
            // {
            //     key:'4-2',
            //     title:'删除菜谱分类',
            //     icon:'default',
            //     path:'/admin/main/cookbook/delete'
            // },
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
        title:'广告管理模块',
        icon:'banner',
        children:[
            {
                key:'6-1',
                title:'广告列表',
                icon:'default',
                path:'/admin/main/banner/list'
            },
            // {
            //     key:'6-2',
            //     title:'修改广告',
            //     icon:'default',
            //     path:'/admin/main/banner/amend'
            // }
        ]
    },
    {
        key:'7',
        title:'用户上传审核模块',
        icon:'audit',
        children:[
            {
                key:'7-1',
                title:'审核通过',
                icon:'default',
                path:'/admin/main/audit/pass'
            },
            {
                key:'7-2',
                title:'审核驳回',
                icon:'default',
                path:'/admin/main/audit/oppose'
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