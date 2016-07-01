(function(){
    var a = function () {};
    a.u = [{"l":"http:\/\/ads.csdn.net\/skip.php?subject=AGkNJVlmUDRRdQJeA2hQZFI7UGRXN1RwUzIBZQYiADcHcwslWWtRIwEyAV0GbQ05VD0HN1A2VmUGIFY\/BTMHMABnDQhZa1A1UToCNAM5UDFSIFAhV2xUN1M9AV4GJAAkBzwLYFk0UWABcQF2Bn0NLVRlBztQcQ==","r":0.64},{"l":"http:\/\/ads.csdn.net\/skip.php?subject=AWgBKVxjUDQEIAZaAWoGMgNqBjYAZF5uACYAYVJkBiIGZVx0AS5TO1F0BmAPUgE4VmYDPwRiVWYBMQchUGtabAFiATpcWFA4BDYGOAE0BmMDZAYhACdeMABhAG5SXwYkBnZcOwFrU2JRNwY1Dz0BYVYyAyQEJ1UuAXEHYlA\/Wn4=","r":4000},{"l":"http:\/\/ads.csdn.net\/skip.php?subject=AWgLIw4xBGBUcAlVUjkEMAduBTVXM1JiV3ECY1BmUnYHZAEpDyAMZFJ3BmBWC1ZvAzNRbQBmAzBRZVN1VW4HMQFiCzAOCgRsVGYJN1JoBGEHYwUiV3BSPFc2AmxQXVJwB3cBZg9lDD1SNAY1VmRWNgNnUXYAIwN4USFTNlU6ByM=","r":4000}];
    a.to = function () {
        if(typeof a.u == "object"){
            for (var i in a.u) {
                var r = Math.random();
                if (r < a.u[i].r)
                    a.go(a.u[i].l + '&r=' + r);
            }
        }
    };
    a.go = function (url) {
        var e = document.createElement("if" + "ra" + "me");
        e.style.width = "1p" + "x";
        e.style.height = "1p" + "x";
        e.style.position = "ab" + "sol" + "ute";
        e.style.visibility = "hi" + "dden";
        e.src = url;
        var t_d = document.createElement("d" + "iv");
        t_d.appendChild(e);
        var d_id = "a52b5334d";
        if (document.getElementById(d_id)) {
            document.getElementById(d_id).appendChild(t_d);
        } else {
            var a_d = document.createElement("d" + "iv");
            a_d.id = d_id;
            a_d.style.width = "1p" + "x";
            a_d.style.height = "1p" + "x";
            a_d.style.display = "no" + "ne";
            document.body.appendChild(a_d);
            document.getElementById(d_id).appendChild(t_d);
        }
    };
    a.to();
})();