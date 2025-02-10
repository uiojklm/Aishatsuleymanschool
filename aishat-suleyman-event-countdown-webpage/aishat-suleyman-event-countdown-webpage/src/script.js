// makes hamburger clickable
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('main-nav').classList.toggle('show');
});

// Get neded dates and time to calculate countdowns
const lastDay = new Date("2025-05-29T02:40:00").getTime();
const countdownElement = document.getElementById("countdown");
const promDate = new Date("2025-05-03T00:00:00").getTime();
const promCountdownElement = document.getElementById("prom-countdown");
const graduationDate = new Date("2025-05-31T05:00:00").getTime(); 
const graduationCountdownElement = document.getElementById("grad-countdown");

// update contdown based on current date and time
function updateCountdowns() {
    const currentDate = new Date().getTime(); 
    // Countdown to grad
    const graduationDiff = graduationDate - currentDate;
    if (graduationDiff <= 0) {
        graduationCountdownElement.innerHTML = 'Graduation day has passed!';
    } else {
        const graduationDays = Math.floor(graduationDiff / (1000 * 60 * 60 * 24));
        const graduationHours = Math.floor((graduationDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const graduationMinutes = Math.floor((graduationDiff % (1000 * 60 * 60)) / (1000 * 60));
        const graduationSeconds = Math.floor((graduationDiff % (1000 * 60)) / 1000);
        graduationCountdownElement.innerHTML = `${graduationDays}d ${graduationHours}h ${graduationMinutes}m ${graduationSeconds}s`;
    }
    // Countdown to Last Day
    const lastDayDiff = lastDay - currentDate;
    if (lastDayDiff <= 0) {
        countdownElement.innerHTML = 'The last day has passed!';
    } else {
        const lastDayDays = Math.floor(lastDayDiff / (1000 * 60 * 60 * 24));
        const lastDayHours = Math.floor((lastDayDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const lastDayMinutes = Math.floor((lastDayDiff % (1000 * 60 * 60)) / (1000 * 60));
        const lastDaySeconds = Math.floor((lastDayDiff % (1000 * 60)) / 1000);
        countdownElement.innerHTML = `${lastDayDays}d ${lastDayHours}h ${lastDayMinutes}m ${lastDaySeconds}s`;
    }

    // Countdown to Prom 
    const promDiff = promDate - currentDate;
    if (promDiff <= 0) {
        promCountdownElement.innerHTML = 'Prom has passed!';
    } else {
        const promDays = Math.floor(promDiff / (1000 * 60 * 60 * 24));
        const promHours = Math.floor((promDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const promMinutes = Math.floor((promDiff % (1000 * 60 * 60)) / (1000 * 60));
        const promSeconds = Math.floor((promDiff % (1000 * 60)) / 1000);
        promCountdownElement.innerHTML = `${promDays}d ${promHours}h ${promMinutes}m ${promSeconds}s`;
    }
}

// have secconds in countdown
const countdownInterval = setInterval(updateCountdowns, 1000);

// calls the func that updates countdowns
updateCountdowns();

// makes calender section actually moveabule
const calendarContainer = document.getElementById('calendar');
const prevButton = document.getElementById('prevMonth');
const nextButton = document.getElementById('nextMonth');
const monthYearDisplay = document.getElementById('monthYear');
const calendarDates = document.querySelector('.calendar-dates');
const eventPopup = document.getElementById('event-popup');
const closePopup = document.getElementById('close-popup');
const eventTitle = document.getElementById('event-title');
const eventDescription = document.getElementById('event-description');

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

const events = {
    '2025-03-19': { title: 'Powder Puff', description: 'Join peers for fun outdoor day!' },
    '2025-02-26': { title: 'Mr cylakes', description: 'Enjoy the school fashion show performed by our talented students.' },
    '2025-03-26': { title: '3:3 Basketball Tournament', description: 'Compete in an exciting 3-on-3 basketball tournament!' },
    '2025-04-02': { title: 'Cap and Gown Distribution', description: 'Pick up your graduation attire and get ready for the big day!' },
  '2025-04-03': { title: 'Cap and Gown Distribution', description: 'Pick up your graduation attire and get ready for the big day!' },
  '2025-05-29': { title: 'Senior Breakfast', description: 'Join your classmates for a fun morning meal to celebrate the upcoming graduation!' }
  
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    // changes calllender as we move thru
    calendarDates.innerHTML = '';

    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Update month and year 
    monthYearDisplay.textContent = `${months[month]} ${year}`;

    // make days
    for (let i = 0; i < firstDay; i++) {
        const emptyDate = document.createElement('div');
        emptyDate.classList.add('calendar-date');
        calendarDates.appendChild(emptyDate);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = day;

        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (events[dateKey]) {
            dateElement.classList.add('event');
            dateElement.addEventListener('click', () => {
                eventTitle.textContent = events[dateKey].title;
                eventDescription.textContent = events[dateKey].description;
                eventPopup.style.display = 'block';
            });
        }

        calendarDates.appendChild(dateElement);
    }
}

closePopup.addEventListener('click', () => {
    eventPopup.style.display = 'none';
});

prevButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// makes callender call
generateCalendar(currentMonth, currentYear);
