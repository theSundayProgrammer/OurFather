reorder();
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function showStr(n)
{
return 	'<p draggable="true" ondragstart="drag(event)"' +
        'ondrop="drop(event)" ondragover="allowDrop(event)" ' +
        'onClick="handleClick(this)"' +
        'class ="item-type"' +
        'id="line'+n.toString() +'">'
          
        +  arr[n]+"</p>" ;
}
function swapClass(el,cl1,cl2)
{
    el.classList.remove(cl1);
    el.classList.add(cl2);
}
function handleClick(obj){
  var result=document.getElementById("result");
  if (result && result.prev)
    /*drop event*/
    {
        var item1 = result.prev;
        var item2 = obj;
        swapClass(item1,"item-type-selected","item-type");
        swapItems(item1,item2);
        result.prev=null;
    }
    else if (result)
    {
        result.prev= obj;
        swapClass(obj,"item-type","item-type-selected");
    }
}

function reorder(){
    var html = "";
    var numbers=[];
    for(i=0;i<arr.length; i++) numbers.push(i);
    shuffle(numbers).forEach(function(item){
        html += showStr(item);
    });
    html += "<br style='clear:both;'/>";

    document.getElementById('result').innerHTML = html;
    var x = document.getElementById("verygood");
    x.style.display = "none";
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function swapItems(item1,item2)
//presumes item1 and item2 have the same parent
{
    var parent = item1.parentElement;
    if( item2 ===item1.nextElementSibling)  
        parent.insertBefore(item2,item1);
    else if( item1 ===item2.nextElementSibling)  
        parent.insertBefore(item1,item2);
    else{
        var next = item1.nextElementSibling;
        parent.insertBefore(item1,item2);
        parent.insertBefore(item2,next);
    }
}

function drop(ev) {
    ev.preventDefault();
    var id= ev.dataTransfer.getData("text");
    var item1 = document.getElementById(id);
    var item2 = ev.target;
    swapItems(item1,item2);
}
function match_line(str)
{
     var re=/line(\d+)/;
     var ma= re.exec(str);
     if(ma)
       return Number(ma[1]);
    else
        return -1;

}
function verify()
{
    var element = document.getElementById('result');
    var items = element.children;
    var n = items.length-1;
    var i =0;
    while (i < n)
    {
        if ( i != match_line(items[i].id))
        {
            //console.log(items[i].tagName);
            //console.log(i.toString() + "th item is wrong");
            break;
        }
        i++;
    }
    if(i == n)
    {
        var x = document.getElementById("verygood");
        if (x.style.display === "none") {
            x.style.display = "inline";
        } else {
            x.style.display = "none";
        }
    }else{
      var item = items[i];
      item.classList.add('tryagain');
      window.setTimeout(()=> {item.classList.remove('tryagain')}, 5000 );
    }

}
