document.addEventListener('DOMContentLoaded', () => {
  const donateButtons = document.querySelectorAll('.donate-btn');

  if (!donateButtons) return; // Extra safety check

  donateButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const actorCard = btn.closest('.actor-card');
      if (!actorCard) return;

      const amountInput = actorCard.querySelector('input');
      const amount = parseFloat(amountInput.value);

      // Validate amount
      if (isNaN(amount) || amount < 10 || amount > 2000) {
        alert('Please enter a donation between 10 and 2000 ZAR.');
        return;
      }

      const actorName = actorCard.querySelector('h3').innerText;

      try {
        const response = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, actorName })
        });

        const session = await response.json();

        if (session.url) {
          window.location.href = session.url; // Redirect to Stripe
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error processing payment. Please try again.');
      }
    });
  });
});














/*
const donateButtons = document.querySelectorAll('.donate-btn');

donateButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const actorName = button.dataset.actor;
    const input = document.querySelector(`#amount-${actorName}`);
    const amount = parseInt(input.value);

    if (!amount || amount < 10 || amount > 2000) {
      alert('Please enter an amount between 10 and 2000 ZAR');
      return;
    }

    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, actorName }),
      });

      const data = await response.json();

      if (data.url) {
        window.location = data.url;
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  });
});
*/