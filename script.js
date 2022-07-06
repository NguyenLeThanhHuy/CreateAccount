// -----------------------Search----------------------
// Close / Open model
var btnOpen = document.querySelector('.open-modal')
var modal = document.querySelector('.modal')
var btnClose = document.querySelector('.close-btn i')

function toggleModel(){
  modal.classList.toggle('hide')
}

btnOpen.addEventListener("click", toggleModel)
btnClose.addEventListener("click", toggleModel)
modal.addEventListener("click", function(e){
  if(e.target == e.currentTarget)
  {
    toggleModel()
  }
})


// ----------------------------Login---------------------
// Container  Login
  var username = document.querySelector('#username');
  var email = document.querySelector('#email');
  var password = document.querySelector('#password');
  var confirmPassword = document.querySelector('#confirm-password');
  var form = document.querySelector('form');


  // -----show câu lỗi----------------
  function showError(input , massage) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add('error');
    small.innerText = massage;
  }

  //---Nhập vào thì xóa show câu lỗi-----------
  function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.remove('error');
    small.innerText = '';
  }

  //--------Check lỗi để trống-----------
  function checkEmptyError(listInput) {
    let isEmptyError = true;
    listInput.forEach(input => {
      input.value = input.value.trim();

      
      if(!input.value)
      {
        showError(input, 'Không được để trống');
        return isEmptyError;
      }
      else 
      {
        showSuccess(input);
        isEmptyError = false;
        return isEmptyError;
      }

    });

    return isEmptyError
  }

  // ----------check lỗi email-----------
  

  function checkUserName(input) {
    var username = document.querySelector("#username").value;
    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
    if (pattern.test(username)) {
        showError(input,'Không được nhập kí tự đặc biệt')
        return false;
    }
    return true; //good user input
}

  function checkEmailError(input) {
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim()

    let isEmailError = !regexEmail.test(input.value)

    if(regexEmail.test(input.value))
    {
      showSuccess(input)
    }else{
      showError(input , 'Email Invalid')
    }

    return isEmailError
  }


  // check lỗi kích thước
  function checkLengthError(input,min ,max) {
    input.value = input.value.trim()

    if(input.value.length < min) {
      showError(input , `Phải có ít nhất ${min} ký tự`)
      return true
    }

    if(input.value.length > max) {
      showError(input , `Không được vượt quá ${max} ký tự `)
      return true
    }

    return false
  }

  // chech lỗi password k trùng

    function checkMatchPasswordError(passwordInput, cfPasswordInput) 
    {
      if(passwordInput.value !== cfPasswordInput.value)
      {
        showError(cfPasswordInput , 'Mật khẩu không trùng khớp')
      return true
      }
      return false
    }

  form.addEventListener('submit',function(e) {
    e.preventDefault()

    
    let isChar = checkUserName(username);


    let isEmptyError = checkEmptyError([email,password,confirmPassword]);

    let isEmailError = checkEmailError(email);

    let isUsernameLengthError = checkLengthError(username ,3,10);
    let isPasswordLengthError = checkLengthError(password,3,10);

    let isMatchPasswordError = checkMatchPasswordError(password,confirmPassword)



    if(isEmptyError || isEmailError || isUsernameLengthError || isPasswordLengthError || isMatchPasswordError || isChar)
    {
      // console.log(isSpclChar)
      console.log(isEmailError)
      console.log(isUsernameLengthError)
      console.log(isEmptyError)
      console.log(isPasswordLengthError)
      console.log(isMatchPasswordError)
      console.log(isChar)
    }else{
      
      // logic , call API
       
        const container = document.querySelector('.main__content');
        const ctn = document.querySelector('.container')
        ctn.style.display = 'none'
        container.style.height = 'unset';
        const content = document.createElement('div');
        content.style.paddingTop = '20px';
        content.style.marginLeft = '50%';
        content.style.transform = 'translateX(-30%)'
        content.style.paddingBottom = '20px';
        content.innerHTML = `
          <h3>Bạn đã đăng kí thành công, vui lòng quay lại trang để đăng nhập.</h3>
        `
        container.appendChild(content);
    }
  });
