async function pay(price) {
  try {
    var res = await fetch("/kakaopay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price,
      }),
    });
    var json = await res.json();
    if (res.status == 200) {
      window.open(json.url);
    }
  } catch {}
}
