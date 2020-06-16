function checkCouponCode(e) {
  const couponCode = coupon.value;
  const xmlhttp = new XMLHttpRequest();
  const output = document.getElementById("coupon-message");
  output.innerHTML = "validating...";
  xmlhttp.open("POST", '/coupon-check', true)
  xmlhttp.onreadystatechange = function() {
    console.log(xmlhttp.readyState);
    if (xmlhttp.readyState == XMLHttpRequest.DONE
        && xmlhttp.status == 200) {
      output.innerHTML = xmlhttp.responseText;
    }
  }
  xmlhttp.setRequestHeader('Content-Type',
    'application/x-www-form-urlencoded;charset=UTF-8');
  xmlhttp.send('coupon=' + couponCode);
}

window.addEventListener('load', function(e) {
  const btnCoupon = document.getElementById('btn-coupon');
  const coupon = document.getElementById('coupon');
  coupon.autocomplete = 'nope';
  btnCoupon.addEventListener('click', checkCouponCode);

  coupon.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      checkCouponCode(e);
      e.preventDefault();
    }
    console.log(e.key);
  });
});