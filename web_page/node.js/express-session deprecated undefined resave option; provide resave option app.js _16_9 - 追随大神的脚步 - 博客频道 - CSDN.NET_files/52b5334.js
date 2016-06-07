(function(){
    var a = function () {};
    a.u = [{"l":"http:\/\/ads.csdn.net\/skip.php?subject=DGUOJg4xUDRWclAMDmUANFA5AzsEZgQgXD0HYwcjBTIFcVxyW2kNfwAzCVUPZAQwUTgGMlg2XnpTOgVhATZUZwxVDj0OMVBsVjZQYQ40AHZQdANuBDIEaFwDB3cHIwVqBTJcNlswDSoAIglzD30EMVE4BnE=","r":0.4},{"l":"http:\/\/ads.csdn.net\/skip.php?subject=Bm9bc1plB2MCJgRYDmUHM1U8UGhVNwMnAWBRNQQgW2wEcF5wDD5WJFJhAl5TOFFlWjMFMVI8AydROFczADcBMgZfW2tadAdrAiQEWA55ByVVbVBsVWoDdQF1USEEc1s6BENeIQxlVhFSIQIzUxdRbVprBXBScQNkUSNXeQAxASAGZFtvWi8HaAIxBHMOKQdlVUdQNFVmA2wBJFFjBBBbegRqXmsMIFYIUmECbFM1UV5abAV9UloDaFE1V3IAYQEVBmVbZVpsB1kCPQRjDikHZFVFUGdVMwMwATVRdwQ\/W20EZ15lDAhWPlJgAjxTZ1EzWjYFIlJ1A21RMFc5AA0BOgZwWzxaMgc0AmQENw4qByNVeFAhVWcDPAFi","r":"0.0012800000"}];
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