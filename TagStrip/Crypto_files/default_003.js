var socket = io('https://bitcryptonews.ru/', {
    path: '/socket/',
    query: "ctx=" + modNodejsConfig.ctx,
    transports: ['websocket', 'flashsocket', 'xhr-polling']
});
function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	 bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}

$(function () {
    socket.on('update_currency', function (data) {
        var cudata = JSON.parse(data);
        var line = $('.courses');
        for (var key in cudata) {
            var current_course = line.find('[data-cur="' + key + '"]');
            if(cudata[key]['percent'].toString().indexOf('-') + 1){
                if(!current_course.hasClass("down")){
                    current_course.removeClass("up");
                    current_course.addClass("down");
                }
                cudata[key]['percent'] = cudata[key]['percent'].toString().substring(1);
                var classtype = 'minus';
            }else{
                if(!current_course.hasClass("up")){
                    current_course.removeClass("down");
                    current_course.addClass("up");
                }
                var classtype = 'plus';
            }
            cudata[key]['price'] = number_format(cudata[key]['price'], 2, '.', '');
            cudata[key]['percent'] = number_format(cudata[key]['percent'], 2, '.', '');
            current_course.find('span.cur').html(cudata[key]['price']);
            current_course.find('span.procent').html(cudata[key]['percent']+'%');
        }
    });
});