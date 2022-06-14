// 모달
function addMeal(){
    modal.style.display = "block";
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var dummydata=[]
//document.addEventListener('keydown',function(e){

document.getElementById('serDB').addEventListener('keydown',function(e){
    if(e.code === 'Enter'){
         
        searchDB()
    }
})

var DBlist_data={} // 사용자가 검색한 db 전체 데이터 저장
var userdata=[] // 사용자가 식단으로 추가한 데이터를 저장
// db에 있는 
function searchDB()
{
    // 검색어
    var kword = document.getElementById('serDB').value;

    if($("#serDB").val().length<=1){
        alert('2글자 이상 입력하셔야 검색이 가능합니다.')
        $("#serDB").focus()
        return false
    }
    
    $.ajax({
        type: "GET",
        url:"/dailycheck/searchMeal/",
        data: {"keyword":kword},
        dataType:"json",   
        success: function (data) {
            DBlist_data = data
            var dblist = ''
            for (var i = 0; i < data.data.length ; i++) {
                dblist += '<tr><td>'+ data.data[i].f_name + '</td>'
                dblist += '<td>'+ data.data[i].f_weight + '</td>'
                dblist += '<td>'+ data.data[i].f_cal + '</td>'
                dblist += '<td><img width=20 height=20 src="/static/img/basic/plus_data.png" onclick="add_meal('+data.data[i].f_id+')"></td></tr>'
            }
            $('#mealdb_tbody').html(dblist)
        },
        error: function () {
            console.log('error');
        }
     });
}

// 식단 등록 테이블에서 해당 row 삭제
function del_meal(num)
{   
    rmtxt = '.foodid'+num
    $(rmtxt).remove()
}

// 검색한 db 데이터를 식단 등록 테이블에 추가 
function add_meal(num)
{
    
    for (var i = 0; i < DBlist_data.data.length; i++) {
        if (num == DBlist_data.data[i].f_id){

            var adddata = DBlist_data.data[i]
        }

    }
    userdata.push(adddata)

    var insertdata=''

    insertdata += '<tr class="foodid'+adddata.f_id+'"><td>'+adddata.f_name +'</td>'
    insertdata += '<td><input id="foodweight'+adddata.f_id+'" class="foodweight" type="text" name="foodweight" size="5" value="'+adddata.f_weight +'" style="text-align:center;"><img width=20 height=20 src="/static/img/basic/chevron.png" onclick="modi_meal('+adddata.f_id+')"></td>'
    insertdata += '<td id="eat_cal'+adddata.f_id+'">'+adddata.f_cal+'</td>'
    insertdata += '<td id="eat_carb'+adddata.f_id+'">'+adddata.f_carb+'</td>'
    insertdata += '<td id="eat_prot'+adddata.f_id+'">'+adddata.f_prot+'</td>'
    insertdata += '<td id="eat_fat'+adddata.f_id+'">'+adddata.f_fat+'</td>'
    insertdata += '<td><img width=20 height=20 src="/static/img/basic/minus_data.png" onclick="del_meal('+adddata.f_id+')"></td></tr>'
 
    $('#meal_input_tbody').append(insertdata)
    document.getElementById('foodweight').addEventListener('keydown',function(e){
        if(e.code === 'Enter'){
            testtest(adddata.id)
        }
    })



    

}

// 식단에 저장한 데이터의 무게를 조절 
function modi_meal(num){
    
    // 수정 전 데이터 저장  
    // 사용자가 식단리스트에 추가한 데이터 중에서 수정하고싶은 데이터를 찾아 modidata에 저장
    for (var i = 0; i < userdata.length; i++) {
        if (num == userdata[i].f_id){
            
            var modidata = userdata[i]
        }
        
    }

    rmtxt = '.foodid'+num
    
    // 무게를 통해 칼로리 및 탄단지 수정을 위한 비율 계산
    var change_gram = document.getElementById('foodweight'+ modidata.f_id ).value;
    var new_ratio = change_gram/Number(modidata.f_weight)
    new_ratio=new_ratio.toFixed(2)
        
    
    var modi_cal =Number(modidata.f_cal)*new_ratio
    var modi_carb =Number(modidata.f_carb)*new_ratio
    var modi_prot =Number(modidata.f_prot)*new_ratio
    var modi_fat =Number(modidata.f_fat)*new_ratio
    
    
    
    var updated_data = ''
    updated_data += '<tr class="foodid'+modidata.f_id+'"><td class="foodid'+modidata.f_id+'">'+ modidata.f_name +'</td>'
    updated_data += '<td><input id="foodweight'+modidata.f_id+'" class="foodweight" type="text" name="foodweight" size="5" value="'+change_gram +'" style="text-align:center;"><img width=20 height=20 src="/static/img/basic/chevron.png" onclick="modi_meal('+modidata.f_id+')"></td>'
    
    var updated_data_cal = '<td id="eat_cal'+modidata.f_id+'">'+modi_cal+'</td>'
    var updated_data_carb = '<td id="eat_carb'+modidata.f_id+'">'+modi_carb+'</td>'
    var updated_data_prot = '<td id="eat_prot'+modidata.f_id+'">'+modi_prot+'</td>'
    var updated_data_fat = '<td id="eat_fat'+modidata.f_id+'">'+modi_fat+'</td>'

    var txt1 = '#eat_cal'+modidata.f_id
    var txt2 = '#eat_carb'+modidata.f_id
    var txt3 = '#eat_prot'+modidata.f_id
    var txt4 = '#eat_fat'+modidata.f_id

    $(txt1).html(updated_data_cal)
    $(txt2).html(updated_data_carb)
    $(txt3).html(updated_data_prot)
    $(txt4).html(updated_data_fat)
    


}