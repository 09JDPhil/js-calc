$(document).ready(function() {

  var entry = '';
  var ans = '';
  var log = '';
  $(".btn").click(function() { //used for every button
    entry = $(this).attr("value");
    console.log("entry: " + entry);
    if (ans.length == 9 || log.length == 20) { //caps max digits at 9 and 20
      log = "";
      ans = "";
      $("#result").html("0");
      $("#history").html("Digit Limit Reached");
      return;
    }
    if (log.search("=") != -1) { //checked after "="button is pressed
      if (/^([-/*+])?$/g.test(entry)) {
        log = ans;
        ans = "";
      } else if (/^([0-9.]*)$/g.test(entry)) {
        log = "";
        ans = "";
      } else if (entry === "ce") {
        $("#result").html("0");
        $("#history").html("0");
        log = "";
        ans = "";
      }
    }
    if (ans.length == 9 || log.length == 20) { //caps max digits at 9 and 20
      log = "";
      ans = "";
      $("#result").html("0");
      $("#history").html("Digit Limit Reached");
      return;
    }
    if (entry === "0") { // nothing happens if 0 is pressed before any other number
      if (!ans) {
        return;
      }
    }
    if (log) { //nothing happens of any operator is called first
      if (/^([-/*+])?$/g.test(entry)) { //checks for a "-", "/", "*", or "+"
        if (log.lastIndexOf("/") !== log.length - 1 && log.lastIndexOf("+") !== log.length - 1 && log.lastIndexOf("*") !== log.length - 1 && log.lastIndexOf("-") !== log.length - 1) { //prevents multiple operators in a row
          log += entry;
          ans = entry;
          console.log("log length " + log);
          $("#result").html(ans);
          $("#history").html(log);
          ans = '';
        }
      }
    }
    if (/^([0-9]*)$/g.test(entry)) { //if digit button is pressed  
      log += entry;
      ans += entry;
      $("#result").html(ans);
      $("#history").html(log);
    } else if (entry === "ac") { //if all clear button is pressed
      ans = "";
      log = "";
      $("#result").html("0");
      $("#history").html("0");
    } else if (entry === ".") { //if decimal button is pressed 
      if (ans) {
        if (ans.indexOf(".") === -1) {
          ans += entry;
          log += entry;
          $("#result").html(ans);
          $("#history").html(log);
        }
      } else {
        log += "0.";
        ans = "0.";
        $("#result").html(ans);
        $("#history").html(log);
      }
    } else if (entry === "ce") {
      if (ans.length === 0 && log.length === 0) {
        return;
      } else if (log.length === 1 && ans.length === 1) {
        $("#result").html("0");
        $("#history").html("0");
        log = "";
        ans = "";
      } else if (log.length >= ans.length) {
        if (ans.length > 1) {
          log = log.slice(0, -1);
          ans = ans.slice(0, -1);
          $("#result").html(ans);
          $("#history").html(log);

        } else {
          log = log.slice(0, -1);
          ans="";
          $("#result").html("0");
          $("#history").html(log);
        }
      }
    } else if (entry === "=" && log.indexOf("=") === -1 && log.search(/[-/*+]/) != -1) { //there can be only 1 "="
      ans = eval(log).toString();
      if (ans.indexOf(".") != -1) {
        ans = (Math.round(ans * 100) / 100).toString();
      }
      log += "=" + ans;
      console.log("= log length " + log.length)
      if (ans.length >= 9 || log.length >= 20) { //caps max digits at 9 and 20
        log = "";
        ans = "";
        $("#result").html("0");
        $("#history").html("Digit Limit Reached");
        return;
      } else {
        $("#result").html(ans);
        $("#history").html(log)
      }
    }
  });
})