CREATE TABLE `fmr_master_user_audio_record` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`recordsId` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`ip` varchar(256) NOT NULL,
	`StationID` bigint NOT NULL,
	`bitrate` varchar(256) NOT NULL,
	`path` varchar(512) NOT NULL,
	`frequencies` varchar(256) NOT NULL,
	`Chanel` varchar(256) NOT NULL,
	CONSTRAINT `fmr_master_user_audio_record_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `record_id_idx` ON `fmr_master_user_audio_record` (`id`);