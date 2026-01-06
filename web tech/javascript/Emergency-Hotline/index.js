
console.log( 'index.js' );


function coinCount1(message, number) {
    
    
    const coinCount = document.getElementById("coin-count");
    //console.log(coinCount)
    let count = parseInt(coinCount.innerText);

    if( count< 20 )
    {
        alert("Not Enough Balance");
        return
    }
    else alert( 'Calling ' + message +' ' + number );

    count -= 20;
    coinCount.innerText = count;
    

    let list = document.getElementById( 'call-list' );

    let div1 = document.createElement( "div" );
    div1.classList.add( 'head11' );
    div1.innerText = message;

    let div2 = document.createElement( 'div' );
    div2.classList.add("head12");
    div2.innerText = number;

    let div3 = document.createElement("div")
    div3.appendChild( div1 );
    div3.appendChild( div2 );

    let div4 = document.createElement( "div" )
    div4.innerText = new Date().toLocaleTimeString();

    let div = document.createElement( "div" )
    div.appendChild( div3 )
    div.appendChild( div4 )

    div.classList.add( 'single-call-list' )
    list.appendChild( div );
    
}

function clearHistory () {
    document.getElementById('call-list').innerHTML=""
}

async function copyText ( message ) {
    const elem = document.getElementById('copy-count');
    let count = parseInt( elem.innerText );
    count++;
    elem.innerText = count;
    
    try {
        await navigator.clipboard.writeText(message);
        alert( "Copied to clipboard "+ message )
    } catch (err) {
        
    }

}


function heartCount (  ) {
    const elem = document.getElementById('heart-count');
    let count = parseInt( elem.innerText );
    count++;
    elem.innerText= count;
}
