/*----------------------------------------------------
    
    addGoogleFonts: a plugin that quickly imports
    Google Fonts with all available styles
    (i.e. italic & bold weight variants)
    
    * Author: HT (@ht-devx)
    * v2.0.0
    * MIT License
    
    github.com/ht-devx/addGoogleFonts

----------------------------------------------------*/

window.addGoogleFonts = (googleFontsList, opts) => {
  if(typeof googleFontsList !== "undefined"){
    if(googleFontsList.trim() !== ""){
      
      let gFontsArray = []; // user input (specifies which fonts)
			let okFontsArray = []; // names of all fonts that exist from the selection
			let finalFontsArray = []; // stylesheet-ready string for that font

			googleFontsList = googleFontsList.replaceAll(",,",",").replaceAll(", ",",").replaceAll(" ,",",").replaceAll(" , ",",");

			// capitalize first letter
			let temp = googleFontsList.split(" ");
			for(let i=0; i<temp.length; i++){
				temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
			}

			googleFontsList = temp.join(" ");
      
      /*---------------------------------*/
      
      // if the string contains ","
      // assume there are multiple fonts to load
      if(googleFontsList.indexOf(",") > -1){
				if(googleFontsList.slice(-1) == ","){
					googleFontsList = googleFontsList.slice(0,-1);
				}

				gFontsArray = googleFontsList.split(",");
			}

			// if string doesn't contain ","
			// assume that it's just one singular font
			else {
				gFontsArray.push(googleFontsList);
			}
      
      /*---------------------------------*/
      
      // check gfonts sheet [1/2]
			if(!document.querySelector("link[rel='preconnect'][href*='//fonts.googleapis.com']")){
				let pcjso = document.createElement("link");
				pcjso.rel = "preconnect";
				pcjso.href = "https://fonts.googleapis.com";
				document.head.append(pcjso)
			}

			// check gfonts sheet [2/2]
			if(!document.querySelector("link[rel='preconnect'][href*='//fonts.gstatic.com'][crossorigin]")){
				let hfthf = document.createElement("link");
				hfthf.rel = "preconnect";
				hfthf.href = "https://fonts.gstatic.com";
				hfthf.crossOrigin = "";
				document.head.append(hfthf);
			}
      
      /*---------------------------------*/
      
      fetch("https://www.googleapis.com/webfonts/v1/webfonts?%6B%65%79=%41%49%7A%61%53%79%44%50%59_%68%4C%56%39%4D%50%71%65%6F%45%6A%45%42%77%77%33%67%32%35%45%69-nUesykA&capability=VF")
      .then(response => response.json())
      .then(res => {

        let items = res.items;
        //console.log(items)
        
        let fontsList = [];

        if(Array.isArray(items)){
            
          for(let font of gFontsArray){
            // check if the requested font(s) exist
            let findFont = items.find(obj => obj.family === font);
            if(findFont){
              //console.log(findFont)
              
              /*---- CHANGE ALL SPACES TO "+" ----*/
              font = font.replaceAll(" ","+");
              
              /*---- IS A VARIABLE FONT ----*/
              if(findFont.axes){
                let varRange = findFont.axes;
                if(varRange){
                  if(Array.isArray(varRange)){
                    console.info(varRange)
                    
                    for(let axis of varRange){
                      if(axis.tag == "wght"){
                        if(axis.start && axis.end){
                          let min = axis.start;
                          let max = axis.end;
                          
                          let currentFont = `${font}:ital,wght@0,${min}..${max};1,${min}..${max}`;
                          finalFontsArray.push(currentFont);

                          if(opts && (opts.logs == true || opts.logs == "true")){                        
                            console.info(`${font.replaceAll("+"," ")}: variable, from ${min} to ${max}`);
                          }
                        }
                      }
                    }
                  }//end: if axes is an array
                }//end: if "axes" exists
              }//end: is variable font
              
              
              /*---- IS NOT A VARIABLE FONT ----*/
              else {
                let wghts = findFont.variants;
                if(wghts){
                  if(Array.isArray(wghts)){
                    
                    let weights = [];
                    let italics = [];
                    
                    /*------------------------*/
                    
                    for(let wght of wghts){
                      
                      // "regular" -> "400"
                      if(wght.trim() == "regular"){
                        let index = wghts.findIndex(variant => variant.trim() === "regular");
                        if(index > -1){
                          wghts[index] = "400";
                        }
                      }
                      
                      // HAS ITALIC
                      if(wght.trim().indexOf("italic") > -1){
                        wghts = wghts.filter(variant => !variant.includes("italic"));  
                      }
                      
                      // finalFontsArray.push(wghts);
                    }//end variants forEach
                    
                    /*------------------------*/
                    
                    for(let wght of wghts){
                      weights.push(`0,${wght}`);
                      italics.push(`1,${wght}`);
                    }
                    
                    if(opts && (opts.logs == true || opts.logs == "true")){
                      console.info(`${font.replaceAll("+"," ")}: ${wghts.join(", ")}`);
                    }
                    
                    /*------------------------*/
                    
                    let currentFont = `${font}:ital,wght@${weights.join(";")};${italics.join(";")}`;
                    finalFontsArray.push(currentFont);
                  }
                }
              }
            }// end: font exists
            
            else {
              console.warn(`"${font}" does not exist on Google Fonts.`)
            }
          }
          
        }//end: if items is an array
        
        
        // add the google fonts stylesheet when everything is done
        if(finalFontsArray.length){
          let finalStr = `https://fonts.googleapis.com/css2?family=${finalFontsArray.join("&family=")}&display=swap`;
          // console.log(finalStr)
          let sheet = document.createElement("link");
          sheet.href = finalStr;
          sheet.rel = "stylesheet";
          document.head.append(sheet);
        }
      })
      .catch(err => {
        console.error(err)
      });
    }//end: if user input is not empty (trim)
  }//end: if user has input (not undefined)
}//end: addGoogleFonts() func
