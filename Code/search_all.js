/**
 * Created with JetBrains WebStorm.
 * User: Hn
 * Date: 13-5-6
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var num=0;
     //Elements
    function formatFileSize(filesize) {
        var unit = "B";
        if (filesize < 1e3) {

        } else if (filesize < 1e6) {
            filesize /= 1e3;
            unit = "K";
        } else if (filesize < 1e9) {
            filesize /= 1e6;
            unit = "M";
        } else if (filesize < 1e12) {
            filesize /= 1e9;
            unit = "G";
        } else if (filesize < 1e15) {
            filesize /= 1e12;
            unit = "T";
        }

        return (filesize.toFixed(1) + unit);
    }

    function AddGuide(parent_id, obj_id, jsoninfo) {
        /**
         * @return {string}
         */
        function AddSearchInfo(jsoninfo,obj_id) {
            /*jsoninfo是这个搜索结果数据是主要部分。其数据为：
             title:放在TopGuide上的标签题目
             fileSize;文件大小
             uploader:上传者的用户名
             uploadtime:上传文件的时间
             filename：显示文件名（不带路径）
             likenum:顶上去的人数
             unlikenum:踩下去人人数
             (预留)tags[]:显示标签
             */
            var contentDiv =
                "<div class='tag'></div>" +
                    "<div class='body clearfix'>" +
                    "<div class='left'>" +
                   // "<div class='top_pic'></div>" + //TODO 预留用来放标签用，如果不用可以直接注解掉
                    "<div class='body_info'>" +
                    "<div class='_info'>" + "文件名称： " + jsoninfo.filename + "</div>" +
                    "<div class='_info'>" + "文件大小： " + jsoninfo.fileSize + "</div>" +
                    "<div class='_info'>" + "上传者&nbsp;&nbsp;&nbsp;： " + jsoninfo.uploader + "</div>" +
                    "<div class='_info'>" + "上传时间： " + jsoninfo.uploadtime + "</div>" +
                    "</div>" +
                    "<div class='end'>" +
                    "<div class='like_pic'></div>" +
                    "<div class='l_num' id="+obj_id+"_like>" + jsoninfo.likenum + "</div>" +
                    "<div class='unlike_pic'></div>" +
                    "<div class='l_num' id="+obj_id+"_unlike>" + jsoninfo.unlikenum + "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='right'>" +
                    "<div class='download'>Download</div>" +
                    "</div>" +
                    "</div>";
            return  contentDiv;
        }
         //TODO 5.12:将js动态加载图片的问题解决掉
        var TopGuide = "<div class='TopGuide'>" + jsoninfo.word + "<div class='rotate' ></div>" + "</div>";
        var SearchInfo = "<div class='SearchInfo clearfix' >" + AddSearchInfo(jsoninfo,obj_id) + "</div>";
        var SearchBar = "<div class='SearchBar' id=" + obj_id + " >" + TopGuide + SearchInfo + "</div>";
        $("#" + parent_id).append(SearchBar);
        $("#" + obj_id + " .TopGuide").click(function () {
            var sv= $("#" + obj_id + " .SearchInfo");
            var st= $("#" + obj_id + " .TopGuide");

            if(sv.css("display")=="block"){
                st.css("box-shadow","none");
                Rotate(obj_id+" .TopGuide .rotate",400,180);
            } else{
                Rotate(obj_id+" .TopGuide .rotate",400,0);
                st.css("box-shadow","0 5px 0 rgb(64,167,109)");
            }
            sv.slideToggle(500);
        });
        BindPlusOneEvent(obj_id+" .like_pic",obj_id+"_like");
        BindPlusOneEvent(obj_id+" .unlike_pic",obj_id+"_unlike");
    }

    function AddRightGuider(parent_id, jsoninfo) {
        /*jsoninfo为整个数据的主要部分，其数据为：
         * course_title 课程名称
         * course_title_a 课程名称的链接
         * course_size 上传文件的大小（提供将字节数换算的功能，可以直接放上去）
         * course_date 上传文件的时间*/
        var content = "<div class='HotCourseTag'>" +
            "<a class='Title' href="+jsoninfo.course_title_a+" >"+jsoninfo.course_title+"</a>" +
            "<p class='Size'>"+"文件大小："+formatFileSize(jsoninfo.course_size)+"</p>"+
            "<p class='Size'>"+"上传时间："+jsoninfo.course_date+"</p>"+
            "</div>";
        $("#"+parent_id).append(content);
    }

    function AnimationPlusOne(parent_id,num_id,offsets){
        $("#"+parent_id).append("<div class='PlusOne'>+1</div>");
        var Left=offsets.left||"0";
        var Top=offsets.top||"0";
        $(".PlusOne").css(
            {
                "color":"darkblue",
                "fontSize":"14px",
                "position":"absolute",
                "opacity":"1",
                "left":Left,
                "top":Top
            }
        ).animate(
            {
                "opacity":"0",
                "top":"-30px"
            },function(){
                $(".PlusOne").remove();
                var c=$("#"+num_id).html()*1;
                $("#"+num_id).html(c+1);
            }
        );
    }

    //Bind Events
    function BindPlusOneEvent(id,num_id){
        $("#"+id).bind("click",function(){
            AnimationPlusOne(id,num_id,{"left":"20px","top":"10px"});
        });
    }

    //Others
    function Rotate(parent_id,time,firstdeg){
        var totaldeg=0;
        function rotateIntervel(parent_id){
            totaldeg+=30;
            $("#"+parent_id).css("transform","rotate("+(firstdeg+totaldeg)+"deg)");
        }
        var into=setInterval(function(){
            rotateIntervel(parent_id);
            if(totaldeg>=180){
                clearInterval(into);
            }
        },time/12);

    }
    //开始后所用来调试的函数

    $(document).ready(function () {
        //添加搜索结果框
        for(var j=0;j<10;j++){
            num++;
            //TODO 添加搜索结果框【】
            AddGuide("sch_left", "SearchResult"+num,
                {
                    word: "DemoHn_"+j,
                    "fileSize": "100M",
                    "uploader": "ZZ",
                    "uploadtime": "2013.5.7",
                    "likenum": 0,
                    "unlikenum": 0
                });
        }
        //添加热门课程框（热门课程搞个“文件大小”是什么意思？）
        //TODO 可以添加热门课程框【】
        for(var i=0;i<10;i++){
            AddRightGuider("sch_right",
                {
                    "course_title":"微积分2",
                    "course_title_a":"http://www.baidu.com",
                    "course_size":13425,
                    "course_date":"5月2日"
                });
        }
    });
})();
