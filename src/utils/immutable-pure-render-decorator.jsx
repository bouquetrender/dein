import { is } from "immutable";

function CompareFn(objA, objB) {
  if (objA === objB || is(objA, objB)) {
    return true;
  }
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  let keysA = Object.keys(objA || {});
  let keysB = Object.keys(objB || {});
  if (keysA.length !== keysB.length) {
    return false;
  }

  let bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

export function deepCompare(_self, nextProps, nextState) {
  return (
    !CompareFn(_self.props, nextProps) || !CompareFn(_self.state, nextState)
  );
}

function shouldComponentUpdate(nextProps, nextState) {
  return deepCompare(this, nextProps, nextState);
}

function puerRenderDecorator(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}

export default puerRenderDecorator;
