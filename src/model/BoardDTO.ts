export class BoardDTO {
  business_cd: string;
  board_id: string;
  board_no: number;
  title: string;
  content: string;
  del_yn: string;
  notice_yn: string;
  popup_yn: string;
  attach_no: number;
  created_at: string;
  created_id: string;
  created_ip: string;
  update_at: string;
  update_id: string;
  update_ip: string;
  mode: string;
  open_popup: boolean;

  constructor(data: Partial<BoardDTO> = {}) {
    this.business_cd = data.business_cd || '';
    this.board_id = data.board_id || '';
    this.board_no = data.board_no || 0;
    this.title = data.title || '';
    this.content = data.content || '';
    this.del_yn = data.del_yn || 'N';
    this.notice_yn = data.notice_yn || 'N';
    this.popup_yn = data.popup_yn || 'N';
    this.attach_no = data.attach_no || 0;
    this.created_at = data.created_at || '';
    this.created_id = data.created_id || '';
    this.created_ip = data.created_ip || '';
    this.update_at = data.update_at || '';
    this.update_id = data.update_id || '';
    this.update_ip = data.update_ip || '';
    this.mode = data.mode || '';
    this.open_popup = data.open_popup || 0;
  }
}
