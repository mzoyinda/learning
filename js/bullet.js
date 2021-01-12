let str = document.querySelectorAll('.bullet');

for (let index = 0; index < str.length; index++) {
    let text = str[index].innerText;
    str[index].innerText="";
    arr = text.split(",");
    let node = document.createElement("ul");

    arr.forEach(element => {
        
        let nodeChild = document.createElement("li");
        textNode = document.createTextNode(element);
        nodeChild.appendChild(textNode);
        node.appendChild(nodeChild);
    });

    str[index].appendChild(node);
    
}