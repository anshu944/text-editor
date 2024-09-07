let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fontList

let fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Geprgia", "Courier New","cursive"];

// Initial setting 

const  initializer = () => {
    //function calls for highlighting buttons
    //no highlights for link , unlink ,lists, undo and redo

    highlighter(alignButtons, true);
    highlighter(spacingButtons,true);
    highlighter(formatButtons,false);
    highlighter(scriptButtons, true);

    // create options for fonts names
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //fontSize allows only till 30
    for(let i=1; i<=30; i++){
        let option =document.createElement("option");
        option.value = i;
        option.innerHTML =i;
        fontSizeRef.appendChild(option); 
    }
//default size
    fontSizeRef.value = 11;
};

//main logic

const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
};

//for basic operations which don't need value parameter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id,false,null);
    });
});

//options that require value parameter(e.g colors, fonts)

advancedOptionButton.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, button.value);
    });
});
 // link
 linkButton.addEventListener("click",() => {
    let userLink = prompt("Enter a URL");
    //if link has http then pass directly else add https
    if(/http/i.test(userLink)){
        modifyText(linkButton.id,false,userLink);

    }
    else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id,false,userLink);
    }

 })


//Highlight clicked buttons

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button should be highlight and other would benormal

            if(needsRemoval){
                let alreadyActive = false;

                //if currently clicked button is already active

                if(button.classList.contains("active")) {
                    alreadyActive = true;
                }

                //remove highlight from other button 
                highlighterRemover(className);
                if(!alreadyActive){
                    //highlight clicked buttons

                    button.classList.add("active");
                }
            }
            else{
                //if other buttons can nbe highlighted
                button.classList.toggle("active");
            }
        });
    });

};


 const highlighterRemover =(className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
 };


window.onload = initializer();
