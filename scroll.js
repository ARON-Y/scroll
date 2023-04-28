const h1 = document.querySelector("h1");
const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("ul li"); // li는 단독으로 사용하지 않아서 ul li라고 적기도 한다. ol에도 li가 붙을 수 있기 때문에 경로를 정확히 적어주는것이 좋다.

//각 섹션의 위치에 해당하는 값을 배열로 저장한 변수
let posArr = []; //빈 배열을 만듦
//offsetTop : 각 요소의 세로 위치 값을 처음 시작점으로 나타내준다.
const base = -500;

let one = sections[0].offsetTop; //section의 0번째 인덱스의 객체에 offsetTop을 부여
let one2 = sections[1].offsetTop;
console.log(one); //0
console.log(one2); //1000

for (let el of sections) {
  posArr.push(el.offsetTop);
  //push : 값을 집어넣어주다.
}
console.log(posArr); //[0, 1000, 1700, 2600]

lis.forEach((el, index) => {
  el.addEventListener("click", () => {
    new Anim(window, {
      prop: "scroll",
      value: posArr[index],
      duration: 500,
    });

    //모든 버튼에 반복을 돌면서 on을 제거하여 비활성화
    for (let el of lis) el.classList.remove("on");

    //클릭한 버튼만 on을 추가해서 활성화
    el.classList.add("on");
    // e.currentTarget.classList.add("on"); lis[index].classList.add("on"); 위의 코드와 동일한 적용을 시켜주는 다른 자바스크립트 코딩들
  });
});

//scroll은 document에서 일어나는게 아니라 window 자체에서 일어나는 이벤트이기 때문에 document가 아닌 window에서 찾아준다.
window.addEventListener("scroll", () => {
  let scroll = window - scrollY || window.pageYOffset;
  /*scrollY, pageYOffset은 완벽하게 값이 같다. 다만 최신버젼은 pageYOffset이다. scrollY는 익스플로러에서 많이 사용하였고, 
  내년부터 익스플로러가 완전히 서비스 종료되면 다른방법이 나오거나 사용하지 않을 테지만 지금까지는 두가지 방법 모두 작성해주어야 한다. 둘다 서로의 디폴트 값으로 작성*/
  //   h1.innerText = scroll;

  sections.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      for (let el of lis) el.classList.remove("on");
      lis[index].classList.add("on");

      sections[index].classList.add("on");
    }
  });

  //   if (scroll >= posArr[0] && scroll < posArr[1]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[0].classList.add("on");
  //   }

  //   if (scroll >= posArr[1] && scroll < posArr[2]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[1].classList.add("on");
  //   }

  //   if (scroll >= posArr[2] && scroll < posArr[3]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[2].classList.add("on");
  //   }

  //   if (scroll >= posArr[3]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[3].classList.add("on");
  //   }
});
