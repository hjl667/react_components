//edge case: type of null is object

const deepCloneUtil = <T>(obj: T): T => {
  if(obj === null || typeof obj !== "object") return obj;
  if(obj instanceof Array) return obj.map(item => deepCloneUtil(item)) as T;
  if(typeof obj === 'object'){
    const cloned = {} as T;;
    Object.keys(obj).forEach((key)=>{
      (cloned as any)[key] = deepCloneUtil((obj as any)[key]);
    })
    return cloned
  }
  return obj;
}
