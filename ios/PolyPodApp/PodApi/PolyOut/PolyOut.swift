import Foundation

protocol PolyOutProtocol {
    func fetch(urlString: String, requestInit: FetchRequestInit, completionHandler: @escaping (FetchResponse?, Error?) -> Void)
<<<<<<< HEAD
    func stat(path: String, completionHandler: @escaping (FileStats?, Error?) -> Void)
    func fileRead(path: String, options: [String: Any], completionHandler: @escaping (Any?, Error?) -> Void)
    func fileWrite(path: String, data: String, completionHandler: @escaping (Error?) -> Void)
    func fileDelete(path: String, completionHandler: @escaping (Error?) -> Void)
    func readDir(path: String, completionHandler: @escaping ([String]?, Error?) -> Void)
=======
    func stat(pathOrId: String, completionHandler: @escaping (FileStats?, Error?) -> Void)
    func fileRead(pathOrId: String, options: [String: Any], completionHandler: @escaping (Any?, Error?) -> Void)
    func fileWrite(pathOrId: String, data: String, completionHandler: @escaping (Error?) -> Void)
    func readdir(dir: String, completionHandler: @escaping ([String]?, Error?) -> Void)
>>>>>>> main
}

class PolyOut: PolyOutProtocol {
    let session: NetworkSession
    let fileStoragePath: URL
    
    init(session: NetworkSession = URLSession.shared) {
        self.session = session
        
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        fileStoragePath = paths[0]
    }
}
