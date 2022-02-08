import { isNumeric } from "./isNumeric";

function precedent(c: string): 3 | 2 | 1 | -1 {
  if (c === "/" || c === "*") return 2;
  else if (c === "+" || c === "-") return 1;
  else return -1;
}

export function infixToPostfix(infix: string | any[]) {
  const st = [];
  let result = "";
  let lastParsed = "operator";
  
  for (const char of infix) {
    if (isNumeric(char) || lastParsed === "operator") {
      result += char;
      lastParsed = "number"
      continue;
    }
    // operator is scanned

    lastParsed = "operator";

    while (st.length !== 0 && precedent(char) <= precedent(st[st.length - 1])) {
      result += ` ${st.pop()}`;
    }
    result += ` `;
    st.push(char);
  }

  // Pop all the remaining elements from the stack
  while (st.length !== 0) {
    result += ` ${st.pop()}`;
    console.log(result);
  }

  return result;
}
