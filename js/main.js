//  HTMLاستدعاء عناصر  ال
let pElements = document.getElementById("pElements"); 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total')
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody = document.getElementById('tbody')
let thead = document.getElementById('thead');
let binDeleteAil = document.getElementById('deleteAil');
let mode = "creale" ;
let tmp;

// لغة الموقع
let Languages = document.getElementById('Languages');
let languag = '';
function languagWep(id){
    if(id == "arabic"){
        Languages.innerHTML = `
        <button onclick="languagWep(this.id)"  id="arabic"> عربي</button>
        <button onclick="languagWep(this.id)" id="english">EN</button>`
        languag = 'arabic';
        document.body.dir = "rtl"
        pElements.textContent  = "إنشاء قراءة تعديل حذف بحث";
        title.placeholder = "العنوان";
        price.placeholder = "السعر";
        taxes.placeholder = "قيمة الضرايب";
        ads.placeholder = "قيمة الاعلانات";
        discount.placeholder = "الخصم";
        count.placeholder = "عدد المنتجات";
        category.placeholder = "فئة المنتج";
        submit.textContent  = "اضافة" ;
        Search.placeholder = " البحث";
        SearchTitle.textContent  = "  البحث بالعنوان";
        SearchCategory.textContent  = " البحث بالفئة"; 
        // total.before("total::before{content: 'المجموع'}")


        //   الى عربيtable تعديل ال
        let table =`
            <tr>
                <th>تعريف</th>
                <th>العنوان</th>
                <th>السعر</th>
                <th>الضرائب</th>
                <th>الاعلانات</th>
                <th>الخصم</th>
                <th>المجموع</th>
                <th>الفئة</th>
                <th>تعديل</th>
                <th>حذف</th>
            </tr> 
            `;thead.innerHTML  = table;
        let english = document.getElementById('english');
        let arabic = document.getElementById('arabic');
        arabic.style.backgroundColor = "#552a7f" ;
        english.style.backgroundColor = "#222" ;

    }
    else if (id == "english"){
        Languages.innerHTML = `
        <button onclick="languagWep(this.id)" id="english">EN</button>
        <button onclick="languagWep(this.id)"  id="arabic"> عربي</button>`
        languag = 'english';
        document.body.dir = "ltr"
        pElements.textContent  = "creare read update delete search";
        title.placeholder = "title";
        price.placeholder = "price";
        taxes.placeholder = "taxes ";
        ads.placeholder = "ads";
        discount.placeholder = "discount";
        total.placeholder = "total";
        count.placeholder = "count";
        category.placeholder = " category";
        submit.textContent  = "Creale" ;
        Search.placeholder = " Search";
        SearchTitle.textContent  = "Search by Category";
        let table =`
        <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>taxes</th>
            <th>ads</th>
            <th>discount</th>
            <th>totle</th>
            <th>category</th>
            <th>update</th>
            <th>delete</th>
        </tr> `;thead.innerHTML  = table;
        let english = document.getElementById('english');
        let arabic = document.getElementById('arabic');
        SearchCategory.textContent  = " Search by Title"; 
        arabic.style.backgroundColor = "#222" ;
        english.style.backgroundColor = "#552a7f" ;

    }
    ReadData()
    localStorage.setItem('Languag', languag );
}
// save languag 
onload = ()=>{
    languag = localStorage.Languag;
    languagWep(languag);
}
// الحصول على المنتج الإجمالي
function getTotal(){
    if (price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value )- +discount.value ;
        total.textContent  = (result);
        total.style.background = ('#33a904');
    }
    else{
        total.style.background = "#a90404";
    }
}
//  اضافة المنتج 
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}
submit.onclick = function(){
    let NewData ={
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent ,
        count: count.value,
        category: category.value
    };

    if(count.value <= 100 && title.value && price.value && category.value != ""){
        if(mode == "creale"){
            if(NewData.count > 1){
                for(let i = 0; i < NewData.count; i++){
                    dataPro.push(NewData);
                }
            }else{
                dataPro.push(NewData);
            }
        }else{
            dataPro[tmp] = (NewData)
            mode = "creale";
            submit.textContent  = "Crwale";
            count.style.display = "block";
            ClrealeData();
        }
        ClrealeData()
    }
    // save localStorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    // تنفيذ امر حذف بيانات الادخال
    
    ReadData()
    getTotal();
}
//  لحذف البيانات الادخال بعد انشاء المنتج
function ClrealeData(){
    title.value = "" ;
    price.value = "" ;
    taxes.value = "" ;
    ads.value = "" ;
    discount.value = "" ;
    total.textContent  = ""
    count.value = "" ;
    category.value = "" ;
}
//  قرات المنتاج 
function ReadData(){
    let table = '';
    for(i = 0; i < dataPro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
            <button onclick="updateData(${i})" id="update">update</button>
            </td>
            <td>
            <button onclick="deleteData(${i})" id="delete">delete</button>
            </td>
        </tr>`
    }
    tbody.innerHTML  = table ; 
    if(languag == 'arabic'){
        if(dataPro.length > 0 ){
            binDeleteAil.innerHTML  =`
            <button onclick="deleteAil()">مسح المنتجات(${dataPro.length})</button>
            `}else{
                binDeleteAil.innerHTML  = ``}
            }

    else if (languag == 'english'){
        if(dataPro.length > 0 ){
            binDeleteAil.innerHTML  =`
            <button onclick="deleteAil()">delete Ail (${dataPro.length})</button>`}
        else{
            binDeleteAil.innerHTML  = ``}
        }

}
ReadData();
// حذف منتج
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    ReadData();
}
// حذف جميع المنتجات
function deleteAil(){
    localStorage.clear();
    dataPro.splice(0);
    ReadData();
}
// تعديل على المنتج
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
    category.value = dataPro[i].category;
    getTotal();
    submit.textContent  = "Update";
    mode = "update";
    tmp = i;

}
// البحث 
let SearchMode = "Title";
let Search = document.getElementById('search');
function getSearch(id){
    if (id == 'SearchTitle'){
        if(languag == 'arabic'){
            Search.placeholder = "البحث بالعنوان";
        }else if (languag == 'english'){
            Search.placeholder = "Search by Title";
        }
        SearchMode = "Title";
    }
    else{
        if(languag == 'arabic'){
            Search.placeholder = "البحث بالفئة";
        }else if (languag == 'english'){
            Search.placeholder = "Search by Category";
        }
        SearchMode = "Category" ;
    }
Search.focus()
Search.value = '';
ReadData()
}
function SearchData(value){
    let table = '';

    if(SearchMode == "Title"){
        for(let i = 0; i < dataPro.length ; i++){
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                        <button onclick="updateData(${i})" id="update">update</button>
                        </td>
                        <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                        </td>
                    </tr>`}
                }
            }
            else if (SearchMode == "Category"){
                for(let i = 0; i < dataPro.length ; i++){
                    if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                        table += `
                        <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                        <button onclick="updateData(${i})" id="update">update</button>
                        </td>
                        <td>
                        <button onclick="deleteData(${i})" id="delete">delete</button>
                        </td>
                        </tr>`}
                    }
                }
        tbody.innerHTML  = table ;
}
// scroll
// let btn = document.getElementById('btn');
// onscroll = function(){
//     if( scrollY >= 200){
//         btn.style.display = 'block';
//     }
//     else{
//         btn.style.display = "none";
//     }
// }
// btn.onclick = function(){
//     scroll({
//         top:0
//     });
// }