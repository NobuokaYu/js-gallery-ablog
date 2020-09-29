// デフォルトのオプション
const OPTIONS = {
    SIZE : 400,
    BORDER : 5,
    BORDERCOLOR: 'white',
}

class Gallery {
  constructor(className,options) {
    for (let k = 0; k < document.getElementsByClassName(className).length; k++) {

      let photoArea = document.getElementsByClassName(className)[k];
      //いらないhrが自動補完されるのでそれを消す
        let hr = photoArea.getElementsByTagName('hr');
        let hrNum = hr.length;
        for (let i = 0; i < hrNum; i++) {
          hr[0].remove();//消すから全部0になる
        };

      //写真の枚数をdivの数から調べる
      let photoNum = photoArea.childElementCount;

      //いらないクラスを削除
      for (var i = 0; i < photoArea.children.length; i++) {
        photoArea.children[i].classList.remove(`column-media-auto`);
        photoArea.children[i].classList.remove(`js_notStyle`);
        photoArea.children[i].classList.remove(`acms-col-sm-12`);
        photoArea.children[i].classList.remove(`nocaption`);
      }

      let Options = OPTIONS;//まずデフォルトを継承

      // 引数が設定されたとき
      if (options !== undefined && options !== null){
        if('SIZE' in options && typeof options.SIZE == 'number'){
          Options.SIZE = options.SIZE;
        };
        if('BORDER' in options && typeof options.BORDER == 'number'){
          Options.BORDER = options.BORDER;
        };
        if('BORDERCOLOR' in options && typeof options.BORDERCOLOR == 'string'){
          Options.BORDERCOLOR = options.BORDERCOLOR;
        };
      };

      //OPTIONの値から変数に代入
      let Size = Options.SIZE;
      let Border = Options.BORDER;
      let BorderColor = Options.BORDERCOLOR;



      //サイズ調整
      let size = Size;
      photoArea.style.width = photoArea.style.height = size+'px';

      //border調整
      let border = Border;
      let borderColor = BorderColor;
      let borderStyle = {
        'padding' : border+'px',
        'background-color' : borderColor,
      };
      for(let property in borderStyle){
        photoArea.style[property] = borderStyle[property];
      };

      let imgList = photoArea.getElementsByTagName('img');

      for (var i = 0; i < photoNum; i++) {
        imgList[i].style.border = border +'px'+'\tsolid\t'+borderColor;
      }


      switch (true) {
        case photoNum === 1:
          break;
        case photoNum === 2:
          if(imgList[0].width===imgList[0].height && imgList[1].width===imgList[1].height){
            //二枚とも正方形の時
            photoArea.style.height = size/2-1;
            photoArea.classList.add('class' , 'flex');
            imgList[0].width = imgList[0].height = imgList[1].width = imgList[1].height = size/2-1;
          }else if (imgList[0].width>=imgList[0].height && imgList[1].width>=imgList[1].height) {
            //横の調整
            imgList[0].width = imgList[1].width = size-1;
            //縦の調整
            imgList[0].height = imgList[1].height = size/2-1;
          }else{
            //一つでも縦長がある時
            photoArea.classList.add('class' , 'flex');
            //横の調整
            imgList[0].width = imgList[1].width = size/2-1;
            //縦の調整
            imgList[0].height = imgList[1].height = size-1;
          };
          break;
        case photoNum === 3:
          if (imgList[0].height>=imgList[0].width) {
            console.log(imgList[0].height);
            //1枚目が縦長の時
            photoArea.classList.add('class' , 'flex-wrap-column');
            //横の調整
            imgList[0].width = imgList[1].width = imgList[2].width = size/2-1;
            //縦の調整
            imgList[0].height = size-1;
            imgList[1].height = imgList[2].height = size/2-1;

          }else{
            console.log(imgList[0].width);
            //1枚目が横長の時
            photoArea.classList.add('class' , 'flex-wrap');
            //横の調整
            imgList[0].width = size-1;
            imgList[1].width = imgList[2].width = size/2-1;
            //縦の調整
            imgList[0].height = imgList[1].height = imgList[2].height = size/2-1;
          }

          break;
        case photoNum === 4:
          if(imgList[0].width===imgList[0].height && imgList[1].width===imgList[1].height && imgList[2].width===imgList[2].height && imgList[3].width===imgList[3].height){
            //全部正方形
            photoArea.classList.add('class' , 'flex-wrap');
            imgList[0].width = imgList[0].height = imgList[1].width = imgList[1].height = imgList[2].width = imgList[2].height = imgList[3].width = imgList[3].height = size/2-1;
          }else if (imgList[0].height>=imgList[0].width) {
            //1枚目が縦長の時
            photoArea.classList.add('class' , 'flex-wrap-column');
            //横の調整
            imgList[0].width = size -size/3-1;
            imgList[1].width = imgList[2].width = imgList[3].width = size/3-1;
            //縦の調整
            imgList[0].height = size-1;
            imgList[1].height = imgList[2].height = imgList[3].height = size/3 -1;
          }else{
            //1枚目が横長の時
            photoArea.classList.add('class' , 'flex-wrap');
            //横の調整
            imgList[0].width = size-1;
            imgList[1].width = imgList[2].width = imgList[3].width = size/3 -1;
            //縦の調整
            imgList[0].height = size*2/3-1;
            imgList[1].height = imgList[2].height = imgList[3].height = size/3-1;
          }
          break;
        case photoNum === 5:
          photoArea.classList.add('class' , 'flex-wrap-column');
          //横の調整
          for (let i = 0; i < 5; i++) {
            imgList[i].width = size/2-1;
          };
          //縦の調整
          imgList[0].height = imgList[1].height = size /2-1;
          for (let i = 2; i < 5; i++) {
            imgList[i].height = size/3-1;
          };
          break;
        case photoNum >= 6:
          photoArea.classList.add('class' , 'flex-wrap-column');
          //横の調整
          for (let i = 0; i < 5; i++) {
            imgList[i].width = size/2-border-1;
          };
          //縦の調整
          imgList[0].height = imgList[1].height = size/2-border-1;
          for (let i = 2; i < 5; i++) {
            imgList[i].height = size/3-border*2/3-1;
          };
          //余った写真
          for (var i = 5; i < photoNum; i++) {
            imgList[i].classList.add('class' , 'none');
          };
          //数字を表示
          let overNumber = document.createElement('p');
          overNumber.textContent = '+' + (photoNum - 5);
          overNumber.classList.add('class','overNumber');
          imgList[4].parentNode.parentNode.classList.add('class','relativePhoto');
          imgList[4].insertAdjacentElement('afterend',overNumber);

          //フォントの調整
          let fontStyle = {
            'font-size' : size/5+'px',
            'line-height' : size/5+'px',
            'color' : borderColor
          };
          let overNumberStyle = document.getElementsByClassName('overNumber')[k].style;
          for(let property in fontStyle){
            overNumberStyle[property] = fontStyle[property];
          };

          //位置の調整
          let locationStyle = {
            'top': imgList[4].height/2 + border - size/5/2 + 'px',
            'left': imgList[4].width/2 + border - overNumber.getBoundingClientRect().width/2 +'px',
          };
          for(let property in locationStyle){
            overNumberStyle[property] = locationStyle[property];
          };
          break;

        default:
            console.log('写真が登録されていません');
      };
    };
  };
};
