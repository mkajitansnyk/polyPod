import Foundation
import MessagePack

class ErrorUploader {
    static let shared = ErrorUploader()

    func uploadToServer(_ errorMsg: String, 
        completionHandler: @escaping (MessagePackValue?, MessagePackValue?) -> Void
    ) {
        let endpointId = "polyApiErrorReport";
        let authToken = "";
            
        do {
            let arrJson = try JSONSerialization.data(
                 withJSONObject: errorMsg, 
                 options: JSONSerialization.WritingOptions.prettyPrinted
            )
            let string = String(
                 data: arrJson,
                 encoding: String.Encoding(rawValue: String.Encoding.utf8.rawValue)
            )
            let payload = string! as String

            PodApi.shared.endpoint.send(
                endpointId: endpointId,
                payload: payload,
                contentType: "application/json",
                authToken: authToken
            ) { error in
                completionHandler(
                    .nil,
                    error == nil ? nil :
                    MessagePackValue("\(#function): \(String(describing: error?.localizedDescription))")
                )
            }
        } catch {
             completionHandler(.nil, MessagePackValue("Send failed"))
        }
    }
}
