document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true
  });
  calendar.render();

  // "오약완" 이벤트와 "오운완" 이벤트에 대한 날짜를 추적하기 위한 Set 객체 생성
  let medicineTakenDates = new Set();
  let exerciseCompletedDates = new Set();

  document
    .getElementById("medicineTaken")
    .addEventListener("click", function () {
      let now = new Date();
      let today = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

      if (!medicineTakenDates.has(today)) {
        calendar.addEvent({
          title: "오약완😊",
          start: today,
          allDay: true
        });
        medicineTakenDates.add(today);
        alert(`오약완😊 참~잘했어용~!!`);
      } else {
        alert("오늘은 이미 완료하셨어용~ 낼와주세요 !!");
      }
    });

  document
    .getElementById("exerciseCompleted")
    .addEventListener("click", function () {
      let now = new Date();
      let today = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

      if (!exerciseCompletedDates.has(today)) {
        calendar.addEvent({
          title: "오운완😊",
          start: today,
          allDay: true
        });
        exerciseCompletedDates.add(today);
        alert(`오약완😊 참~잘했어용~!!`);
      } else {
        alert("오늘은 이미 완료하셨어용~ 낼와주세요 !!");
      }
    });
  // JavaScript 내에 통계 정보를 가져오는 함수 추가
  function updateStatistics() {
    fetch("/get_statistics?user_id=example_user")
      .then((response) => response.json())
      .then((data) => {
        // 통계 정보를 버튼 하단에 표시
        document.getElementById("statistics").innerHTML = `오약완: ${
          data["오약완😊"] || 0
        }, 오운완: ${data["오운완😊"] || 0}`;
      })
      .catch((error) => console.error("Error:", error));
  }

  // 이벤트 추가 후 통계 정보 업데이트
  document
    .getElementById("medicineTaken")
    .addEventListener("click", function () {
      // 기존 코드...
      updateStatistics(); // 이벤트 추가 후 통계 정보 업데이트
    });

  document
    .getElementById("exerciseCompleted")
    .addEventListener("click", function () {
      // 기존 코드...
      updateStatistics(); // 이벤트 추가 후 통계 정보 업데이트
    });

  // 페이지 로드 시 통계 정보 업데이트
  document.addEventListener("DOMContentLoaded", function () {
    // 기존 코드...
    updateStatistics(); // 초기 통계 정보 로드
  });
});
