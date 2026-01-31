// Intersection Observer
const steps = document.querySelectorAll('#cardActives .parent-card');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }
);

steps.forEach(step => observer.observe(step));



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlcy9hYm91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIiXSwiZmlsZSI6InBhZ2VzL2Fib3V0LmpzIn0=

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlcy9hYm91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbnRlcnNlY3Rpb24gT2JzZXJ2ZXJcbmNvbnN0IHN0ZXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NhcmRBY3RpdmVzIC5wYXJlbnQtY2FyZCcpO1xuXG5jb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCB7IHRocmVzaG9sZDogMC4zIH1cbik7XG5cbnN0ZXBzLmZvckVhY2goc3RlcCA9PiBvYnNlcnZlci5vYnNlcnZlKHN0ZXApKTtcblxuXG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zjg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaUlpd2ljMjkxY21ObGN5STZXeUp3WVdkbGN5OWhZbTkxZEM1cWN5SmRMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlpWFN3aVptbHNaU0k2SW5CaFoyVnpMMkZpYjNWMExtcHpJbjA9XG4iXSwiZmlsZSI6InBhZ2VzL2Fib3V0LmpzIn0=
