const STORAGE_KEY = 'mall';
export default {
    // 存储值  module_name为模块对象，即user
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name, val);
        } else {
            let val = this.getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        }
    },
    // 取某一个模块下的属性 (user下面的userName)
    getItem(key, module_name) {
        if (module_name) {
            let val = this.getItem(module_name)
            if (val) return val[key]
        }
        return this.getStorage()[key];
    },
    // 获取整个数据
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY || '{}'))
    },
    // 清空某一个值
    clear(key, module_name) {
        let val = this.getStorage();
        if (!val) {
            return
        }
        if (module_name) {
            delete val[module_name][key];
        } else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
}