import pool from '../config/database.js'

class Node {
    static async getAllNodes() {
        const [rows] = await pool.query("SELECT * FROM tree_nodes")
        return rows
    }

    static async getNodeById(id) {
        const [rows] = await pool.query(`
        SELECT * 
        FROM tree_nodes
        WHERE id = ?
        `, [id])
        return rows[0]
    }

    static async addNode(parentId) {
        const [result] = await pool.query(`
            INSERT INTO tree_nodes (pid)
            VALUES (?)
        `, [parentId])
        return result.insertId
    }
    
}
  
export default Node