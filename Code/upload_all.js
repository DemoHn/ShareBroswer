/**
 * Created with JetBrains WebStorm.
 * User: Hn
 * Date: 13-5-3
 * Time: 上午2:38
 * To change this template use File | Settings | File Templates.
 */
//with jquery
var demohn = (function () {
    var Info_id_num = 0;
    var fileroute = "";
    var input_min_length = 40;
    var input_max_length = 55;
    var textarea_min_row = 6;
    var note_text = "输入文件名称";
    var lib_text = "数据库名";
    var name_text = "此处可以尽情卖萌^.^";
    var fileroutes = [];
    var isAviliable = [0];
    //这里使用了所有的file的路径
    /**
     * @return {string}
     */
    function AddTag(arugments) {
        var main_id = "SchTag";
        var str = "";

        /**
         * @return {string}
         */
        function AddOneTag(word, main_id, num) {
            return "<div class='SearchTag' id=" + main_id + "_" + num + " >" + word + "</div>";
        }

        var i;
        for (i = 0; i < arugments.length; i++) {
            str += AddOneTag(arugments[i], main_id, i);
        }
        return str+"<br />";
    }

    /**
     * @return {string}
     */
    function AddAdmitButton(word, btn_id, mode) {
        if (mode == 'file') {
            return  "<div class='ItemTag_Button' id=" + btn_id + ">" +
                "<span id='cbtnspan'><input id='cbtn' type='file' />" +
                "</span><div id='cbtntext'>" + word + "</div>" + "</div><br />";
        } else {
            return "<div class='ItemTag_Button' id=" + btn_id + ">" + word + "</div><br />";
        }
    }

    function CreateDialog(parent_id) {
        var DialogIndex = "<div class='DialogBox'>" +
            "<div class='DialogBox_Left clearfix'>" +
            // "<div class='UpLoadBtn' >" +
            // "<input type='file' id='File' />" +
            //  "<div class='up_text'>添加文件</div>"+
            // "</div>"+
            AddInput("修改名称", "NAME", parent_id + "_Route", note_text, "") +
            AddInput("目标库", "LIBRARY", parent_id + "_Library", lib_text, "") +
            AddInput("标签", "TAG", parent_id+"_SearchTag","","tags") +
            AddInput("说明", "NOTE", parent_id + "_Note", name_text, "textarea") +
            "</div>" +
            "<div class='DialogBox_Right'>" +
            "</div>"
            + "</div>";

        return DialogIndex;
    }

    /**
     * @return {string}
     */
    function AddItemTag(finame, laname) {
        return "<div class='ItemTag_Main'>" +
            "<div class='ItemTag_TextTag'>" +
            finame
            + "</div>" +
            "<div class='ItemTag_WordTag'>" +
            laname
            + "</div>" + "</div>";
    }

    /**
     * @return {string}
     */
    function AddInput(finame, laname, input_id, tag_word, mode) {
        if (mode === "") {
            return "<div class='ItemTag_Wrap'>" + AddItemTag(finame, laname)
                + "<input class='ItemTag_Input' type='text' size=" + input_min_length + " id=" + input_id + " value=" + tag_word + " />" + "</div><br />";
        } else if (mode === "textarea") {
            return "<div class='ItemTag_Wrap'>" + AddItemTag(finame, laname)
                + "<textarea class='ItemTag_Input TT'  cols=" + input_min_length + " rows=" + textarea_min_row + " id=" + input_id + " >" + tag_word + "</textarea></div><br />";
        } else if (mode === "tags") {

            return "<div class='ItemTag_Wrap'>"+AddItemTag(finame, laname)+
                AddTag(["1", "2", "3"])+"</div>";
        }
    }

    function AddEventListener(input_id, blur_tag_word) {
        $("#" + input_id).bind("focus",function () {

            var v = $("#" + input_id);
            if (v.val() == blur_tag_word) {
                v.val("");
                v.css("color", "black");
            }
        }).bind("keyup",function () {
                var v = $(" #" + input_id);
                var val = v.val().replace(/[^\x00-\xff]/g, "xx").length + 1;
                if (val >= input_min_length && val <= input_max_length) {
                    v.attr("size", val.toString());
                } else if (val < input_min_length) {
                    v.attr("size", input_min_length);
                } else if (val > input_max_length) {
                    v.attr("size", input_max_length);
                }
            }).bind("blur", function () {
                var v = $(" #" + input_id);

                if (v.val() === "") {
                    v.css("color", "#999");
                    v.val(blur_tag_word);
                }
            });
    }


    function AddTEARListener(input_id, blur_tag_word) {
        var v = $(" #" + input_id);
        v.attr("rows", textarea_min_row);
        v.attr("cols", input_min_length - 2);
        v.bind("focus",function () {
            if (v.val() == blur_tag_word) {
                v.val("");
                v.css("color", "black");
            }
        }).bind("blur", function () {
                var v = $(" #" + input_id);

                if (v.val() === "") {
                    v.css("color", "#999");
                    v.val(blur_tag_word);
                }
            });
    }


    function getFullPath(obj) {
        if (obj) {
            //Internet Explorer
            if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                obj.select();
                return document.selection.createRange().text;
            }
            //Firefox
            else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                if (obj.files) {
                    window.URL = window.URL || window.webkitURL;
                    return  window.URL.createObjectURL(obj.files.item(0));
                }
                return obj.value;
            }
            return obj.value;
        }
    }

    function AddUploadEvent(file_id) {
        $("#" + file_id).bind("change", function () {
            var filename = $("#" + file_id).val();
            var regChrome = /C:\\fakepath\\(.*)/;
            if (regChrome.test(filename) != false) {
                filename = RegExp.$1;
            }
            var obj = $("#" + file_id).get(0);
            var tempForm = document.createElement('form');
            var inputFile = "<span id='cbtnspan'><input id='cbtn' type='file' />" + "</span>";
            $(inputFile).before(tempForm);
            $(tempForm).append(inputFile);
            tempForm.reset();
            $(tempForm).after(inputFile);
            $(tempForm).remove();
            var leng = fileroutes.length;
            fileroutes[leng] = getFullPath(obj);
            isAviliable[leng] = 1;
            Upload("upload").CreateInfo(filename, "2", "3");

        });
    }

    function WriteInInfo(InfoIndex, Info_id, father_id) {
        var regnum = /[0-9]+/;
        $("#" + father_id).prepend(InfoIndex);
        $("#" + Info_id).css("display", "none").fadeIn("slow");
        $("#" + Info_id + " .DialogBox_Cancel").click(function () {
            $("#" + Info_id).animate({opacity: 0}, function () {
                var i = regnum.exec(Info_id);
                isAviliable[i - 1] = 0;
                $("#" + Info_id).remove();

            });
        });
        $('.DialogBox').css("display", "none").fadeIn("fast");
        AddEventListener(Info_id + "_Library", lib_text);
        AddTEARListener(Info_id + "_Note", name_text);
        AddEventListener(Info_id + "_Route", note_text);
    }

    function AddToggleEvent(parent_id) {
        $("#" + parent_id + " .Toggle").bind("click", function () {
            var regnum = /[0-9]+/;
            var obj = $("#" + parent_id);
            var hei = regnum.exec(obj.css("height"));
            if (hei > 50) {
                obj.animate({"height": "50px"});
                $("#B_" + parent_id).hide();
            } else {
                obj.animate({"height": "400px"});
                $("#B_" + parent_id).show();
            }
        });
    }

    function FillDemo(filename, input_id) {
        var str = filename.split(".");
        var regIE = /\\.*\\(.*)/;
        if (regIE.test(str[0]) != false) {
            str[0] = RegExp.$1;
        }
        var s = "";
        var t;
        for (t = 0; t < str.length - 1; t++) {
            s += str[t];
            if (t != str.length - 2) {
                s += ".";
            }
        }
        $("#" + input_id).val(s).css("color", "black");
    }

    function FirstUpload(parent_id, head_id) {
        $("#" + head_id).append("<div class='UpLoadBtn' id='UpBtn' >" + "<span id='FileWrap'><input type='file' id='File' />" +
            "<div class='up_text'>点我上传！</div>" + "</div>");
        $('#File').bind("change", function () {
            $("#UpBtn").fadeOut("fast");
            Upload(parent_id).CreateHead("help_button");
            var fileN = $("#File").val();
            var regIE = /\\.*\\(.*)/;
            if (regIE.test(fileN) != false) {
                fileN = RegExp.$1;
            }
            var obj = $("#File").get(0);
            fileroutes[0] = getFullPath(obj);
            isAviliable[0] = 1;
            Upload(parent_id).CreateInfo(fileN, "2", "3");
            AddUploadEvent("cbtn");
            $("#foot").css({"position": "static", "bottom": "0"});
            $("#Upload_Button").bind("click", function () {
                Upload("upload").UploadHead("DialogBox_Info");
            });
        });
    }

    var Upload = function (father_id) {
        return{

            CreateInfo: function (filename, lib, note) {
                var domain_id = "InfoBox";
                var domain_class = "DialogBox_Info";
                Info_id_num += 1;
                var final_id = domain_id + "_" + Info_id_num.toString();
                var InfoIndex = "<div class='DialogBox_Info clearfix' id=" + final_id + " >" +
                    "<div class='DialogBox_Cancel'></div>" +
                    "<div class='DialogBox_files' id=F_" + final_id + ">" +
                    "<div class='FileName'> " + filename + "</div>"
                    + "<a href='javascript:' class='Toggle'> 显示/隐藏</a>" + "</div>" +
                    "<div class='DialogBox_body' id=B_" + final_id + ">" + CreateDialog(final_id) + "</div>"
                    + "</div>";
                WriteInInfo(InfoIndex, final_id, father_id);
                AddToggleEvent(final_id);
                FillDemo(filename, final_id + "_Route");

            },
            CreateHead: function (parent_id) {
                var str = "<table align='right'>" +
                    "<tr><td>" + AddAdmitButton('继续添加', 'Continue_Button', 'file') + "</td><td>"
                    + AddAdmitButton('完成上传', 'Upload_Button', '') + "</tr></table>";
                $("#" + parent_id).append(str);
            },
            UploadHead: function (content_class) {      //这是读取所有文件信息的地方，当“上传”按钮出发时
                var i;
                var obj = $("." + content_class).get();
                for (i = 0; i < fileroutes.length; i++) {
                    if (isAviliable[i] == 1) {
                        var iname = $("#InfoBox_" + (i + 1) + "_Route").val();//这个文件的文件名字（不要被"Route"所迷惑）
                        if (iname == name_text) {
                            iname = "";
                        }        //没有输入时自动清空

                        var ilib = $("#InfoBox_" + (i + 1) + "_Library").val(); //这个文件的目标库
                        if (ilib == lib_text) {
                            ilib = "";
                        }
                        var inote = $("#InfoBox_" + (i + 1) + "_Note").val();    //对于这个文件的注释
                        if (inote == note_text) {
                            inote = "";
                        }
                        var iroute = fileroutes[i];                     //这是这个文件的绝对路径（在firefox和chrome下文件的路径会比较奇葩）
                        //每一个条目都存有四个数据：iname,ilib,inote,和iroute
                        //iname 表示文件的名字,ilib表示文件所指向的目标库,inote表示对于这个文件的注释,iroute表示这个文件的绝对路径
                    }
                }
            }
        }
    };


    $(document).ready(
        function () {
            FirstUpload("upload", "help_button");
            start();
            $("#foot").css({"position": "fixed", "bottom": "15%"});
        }
    );

})();

